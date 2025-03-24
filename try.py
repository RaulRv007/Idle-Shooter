import requests


url = 'http://127.0.0.1:5000/hand'
requests.put('http://127.0.0.1:5000/hand', json={"try": 'try'})

response = requests.get(url)


if response.status_code == 200:
    data = response.json()  
    print("Received data from the API:")
    print(data)
else:
    print(f"Failed to get data from the API. Status code: {response.status_code}")
