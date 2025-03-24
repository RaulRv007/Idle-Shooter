from flask import Flask,request, jsonify
from flask_cors import CORS 

app = Flask(__name__)
CORS(app) 

data_store = []

@app.route('/hand', methods=['PUT'])
def put_data():
    """Receives JSON data and updates the existing data."""
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid data"}), 400

    data_store.clear()  
    data_store.append(data)  

    return jsonify({"message": "Data updated successfully", "data": data}), 200

@app.route('/hand', methods=['GET'])
def get_data():
    """Returns all stored data."""
    return jsonify({"data": data_store}), 200



if __name__ == '__main__':
    app.run(debug=True)
