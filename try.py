import requests

# Set the URL for the Flask API endpoint
url = 'http://127.0.0.1:5000/hand'  # Replace with your API URL
requests.put('http://127.0.0.1:5000/hand', json={"try": 'try'})
# Send a GET request to the API
response = requests.get(url)

# Check if the request was successful
if response.status_code == 200:
    data = response.json()  # Parse the JSON data from the response
    print("Received data from the API:")
    print(data)
else:
    print(f"Failed to get data from the API. Status code: {response.status_code}")
