import os
import cv2
from flask import Flask, jsonify, request
from flask_cors import CORS
from deepface import DeepFace;

app = Flask(__name__)
CORS(app)  # Enable CORS for the entire app

BASE_IMAGE_FOLDER = r"D:\Face-Expression-Tracker\Back-end\photos"
SUPPORTED_EXTENSIONS = ('.jpg', '.jpeg', '.png', '.bmp', '.gif')

@app.route('/analyze_emotions', methods=['GET'])
def analyze_emotions():
    # Get child and session parameters from the request
    child = request.args.get('child')
    session = request.args.get('session')

    if not child or not session:
        return jsonify({"error": "Child or session ID not provided."}), 400

    image_folder = os.path.join(BASE_IMAGE_FOLDER, child, session)
    if not os.path.exists(image_folder):
        return jsonify({"error": f"Folder {image_folder} does not exist."}), 404

    # List and analyze images
    image_files = [
        f for f in os.listdir(image_folder)
        if f.lower().endswith(SUPPORTED_EXTENSIONS) and not f.lower().startswith("screenshot")
    ]
    results = []

    if not image_files:
        return jsonify({"error": f"No valid images found in folder: {image_folder}"}), 404

    for image_file in image_files:
        image_path = os.path.join(image_folder, image_file)

        img = cv2.imread(image_path)
        if img is None:
            results.append({"file": image_file, "error": f"Unable to load the image at {image_path}."})
            continue

        try:
            res = DeepFace.analyze(img, actions=['emotion'], detector_backend='opencv')
            if isinstance(res, list):
                res = res[0]

            emotions = res['emotion']
            max_emotion = max(emotions, key=emotions.get)

            results.append({
                "file": image_file,
                "emotions": {emotion: f"{score:.2f}%" for emotion, score in emotions.items()},
                "dominant_emotion": max_emotion,
                "dominant_score": f"{emotions[max_emotion]:.2f}%"
            })
        except Exception as e:
            results.append({"file": image_file, "error": str(e)})

    return jsonify(results)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
