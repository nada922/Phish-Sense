import pickle
import xgboost as xgb
import numpy as np

MODEL_PATH = r'E:\PhishSense Graduation Project\Phish-Sense\AI Model\XGBoostClassifier.pickle.dat'
RESCUE_PATH = r'E:\PhishSense Graduation Project\Phish-Sense\AI Model\temp_rescue.bin'

print("=== Try 1: Standard Pickle ===")
try:
    with open(MODEL_PATH, "rb") as f:
        model = pickle.load(f)
    print(f"SUCCESS: {type(model)}")
    pred = model.predict(np.zeros((1,16)))
    print(f"Predict result: {pred}")
except Exception as e:
    print(f"FAIL: {e}")

print()
print("=== Try 2: XGBClassifier.load_model on .dat ===")
try:
    m = xgb.XGBClassifier()
    m.load_model(MODEL_PATH)
    print(f"SUCCESS: {type(m)}")
    pred = m.predict(np.zeros((1,16)))
    print(f"Predict result: {pred}")
except Exception as e:
    print(f"FAIL: {e}")

print()
print("=== Try 3: Booster.load_model on rescue.bin ===")
try:
    b = xgb.Booster()
    b.load_model(RESCUE_PATH)
    print(f"SUCCESS: {type(b)}")
    dm = xgb.DMatrix(np.zeros((1,16)))
    out = b.predict(dm)
    print(f"Booster predict: {out}")
except Exception as e:
    print(f"FAIL: {e}")

print()
print("=== Try 4: XGBClassifier.load_model on rescue.bin ===")
try:
    m2 = xgb.XGBClassifier()
    m2.load_model(RESCUE_PATH)
    print(f"SUCCESS: {type(m2)}")
    pred2 = m2.predict(np.zeros((1,16)))
    print(f"Predict result: {pred2}")
    prob2 = m2.predict_proba(np.zeros((1,16)))
    print(f"Predict_proba: {prob2}")
except Exception as e:
    print(f"FAIL: {e}")

print()
print("=== xgboost version ===")
print(xgb.__version__)
