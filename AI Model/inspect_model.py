"""
Manual extraction of XGBoost booster binary from old pickle file.

The XGBoost < 1.0 pickle stores the model as:
  XGBClassifier.__getstate__() -> dict with key 'handle' containing raw bytes of booster.

XGBoost 1.x pickle stores it differently - as __dict__ with _Booster having save_model buffer.

Let's find the binary buffer embedded in this pickle.
"""
import pickle
import xgboost as xgb
import numpy as np
import struct

MODEL_PATH = r'XGBoostClassifier.pickle.dat'

with open(MODEL_PATH, 'rb') as f:
    raw = f.read()

print(f'File size: {len(raw)}')
print(f'First bytes: {raw[:20].hex()}')

# Find all long byte sequences (> 1000 bytes) - the booster binary will be a large blob
# In pickle, BYTES/BINBYTES are stored as: opcode + 4-byte-len + data
# Protocol 3 BINBYTES: 0x42 + 4 byte little-endian length + data
# Protocol 3 BINBYTES8: 0x8e + 8 byte little-endian length + data
# SHORT_BINBYTES: 0x43 + 1 byte length + data

found_blobs = []
i = 0
while i < len(raw):
    if raw[i] == 0x42:  # BINBYTES
        if i + 4 < len(raw):
            size = struct.unpack('<I', raw[i+1:i+5])[0]
            if size > 5000:
                found_blobs.append((i, size, 'BINBYTES'))
                print(f'  BINBYTES at {i}: size={size}')
        i += 1
    elif raw[i] == 0x8e:  # BINBYTES8
        if i + 8 < len(raw):
            size = struct.unpack('<Q', raw[i+1:i+9])[0]
            if size > 5000:
                found_blobs.append((i, size, 'BINBYTES8'))
                print(f'  BINBYTES8 at {i}: size={size}')
        i += 1
    else:
        i += 1

print(f'\nFound {len(found_blobs)} large blobs')

# Extract and try to load the largest blob as an XGBoost model
for pos, size, optype in found_blobs:
    if optype == 'BINBYTES':
        blob = raw[pos+5:pos+5+size]
    else:
        blob = raw[pos+9:pos+9+size]
    
    print(f'\nBlob at {pos} (size {size}): first bytes = {blob[:20].hex()}')
    print(f'First chars: {blob[:30]}')
    
    # Try loading this blob as a model
    tmp_path = f'blob_{pos}.bin'
    with open(tmp_path, 'wb') as f:
        f.write(blob)
    
    import os
    try:
        b = xgb.Booster()
        b.load_model(tmp_path)
        print(f'  SUCCESS: Loaded as Booster!')
        dm = xgb.DMatrix(np.zeros((1,16)))
        out = b.predict(dm)
        print(f'  Predict: {out}')
        # Save as proper model
        b.save_model('rescued_model.json')
        print(f'  Saved to rescued_model.json')
    except Exception as e:
        print(f'  Booster failed: {e}')
    
    os.remove(tmp_path)
