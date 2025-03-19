from flask import Flask,request, jsonify
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
# In-memory storage
data_store = []

@app.route('/hand', methods=['PUT'])
def put_data():
    """Receives JSON data and updates the existing data."""
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid data"}), 400

    # Assuming data_store contains data that needs to be updated. 
    # Modify the existing data as needed based on the incoming request.
    # Example: Here, we replace all current data with the new data.
    data_store.clear()  # This clears the previous data
    data_store.append(data)  # Adds the new data

    return jsonify({"message": "Data updated successfully", "data": data}), 200

@app.route('/hand', methods=['GET'])
def get_data():
    """Returns all stored data."""
    return jsonify({"data": data_store}), 200



if __name__ == '__main__':
    app.run(debug=True)
