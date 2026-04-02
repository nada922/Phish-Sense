import pickle
import xgboost as xgb
import os

# This script attempts to "rescue" an old XGBoost pickle by manually 
# locating the booster bytes and saving it as a modern JSON model.

def rescue_model(input_path, output_path):
    print(f"Rescuing {input_path}...")
    
    with open(input_path, 'rb') as f:
        data = f.read()

    # Find the magic marker for the booster
    # In older versions, it usually starts with 'bin' or after 'xgboost.core'
    marker = b'bin\x00'
    start = data.find(marker)
    
    if start == -1:
        # Try another common marker
        marker = b'\x00\x05'
        start = data.find(marker)
        
    if start != -1:
        print(f"Found potential booster data at byte {start}")
        booster_data = data[start:]
        
        # Try to load it directly
        temp_bin = "temp_booster.bin"
        with open(temp_bin, "wb") as f:
            f.write(booster_data)
        
        try:
            bst = xgb.Booster()
            bst.load_model(temp_bin)
            bst.save_model(output_path)
            print(f"✅ SUCCESS! Rescued model saved as JSON to: {output_path}")
            return True
        except Exception as e:
            print(f"Failed to load extracted bytes: {e}")
        finally:
            if os.path.exists(temp_bin): os.remove(temp_bin)
    
    print("❌ Could not rescue the model automatically.")
    return False

if __name__ == "__main__":
    rescue_model("XGBoostClassifier.pickle.dat", "XGBoost_Modern.json")
