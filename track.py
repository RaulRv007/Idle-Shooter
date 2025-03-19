from cvzone.HandTrackingModule import HandDetector
import cv2
import socket
import requests
import time  # Import time module to handle delays

cap = cv2.VideoCapture(0)
cap.set(3, 1280)
cap.set(4, 720)
success, img = cap.read()
h, w, _ = img.shape
detector = HandDetector(detectionCon=0.8, maxHands=2)

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
serverAddressPort = ("127.0.0.1", 5052)

last_post_time = time.time()  # Initialize last post time
post_interval = 1/30  # Set the interval to send POST requests (in seconds)

while True:
    # Get image frame
    success, img = cap.read()
    # Find the hand and its landmarks
    hands, img = detector.findHands(img)  # with draw
    data = []
    img = cv2.flip(img, 1)

    if hands:
        # Hand 1
        hand = hands[0]
        lmList = hand["lmList"]  # List of 21 Landmark points
        for lm in lmList:
            data.extend([lm[0], h - lm[1], lm[2]])

        # Always send the POST request but check the interval
        current_time = time.time()
        if current_time - last_post_time >= post_interval:
            # Send POST request periodically (every `post_interval` seconds)
            print(data)
            requests.put('http://127.0.0.1:5000/hand', json=data)
            #sock.sendto(str.encode(str(data)), serverAddressPort)
            last_post_time = current_time  # Update last post time to current time

    # Display the image with hand tracking
    cv2.imshow("Image", img)
    cv2.waitKey(1)
