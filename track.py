from cvzone.HandTrackingModule import HandDetector
import cv2
import socket
import requests
import time  # Import time module to handle delays
import math

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
    img2 = img
    img = cv2.flip(img, 1)
    requests.put('http://127.0.0.1:5000/hand', json=data)

    if hands:
        # Hand 1
        hand = hands[0]
        lmList = hand["lmList"]  # List of 21 Landmark points

        for lm in lmList:
            data.extend([lm[0], h - lm[1], lm[2]])

        print(lmList[8][:2])
        x1, y1 = lmList[8][:2]
        x2, y2 = lmList[12][:2]
        cx, cy = (x1 + x2) // 2, (y1 + y2) // 2
        length = math.hypot(x2 - x1, y2 - y1)
        #length, info = detector.findDistance((x1, y1), (x2, y2))
        data.extend([int(length)])
        print(data)
        print(length)
        cv2.circle(img2, (x1, y1), 5, (255, 0, 255), cv2.FILLED)
        cv2.circle(img2, (x2, y2), 5, (255, 0, 255), cv2.FILLED)
        cv2.line(img2, (x1, y1), (x2, y2), (255, 0, 255), max(1, 5 // 3))
        cv2.circle(img2, (cx, cy), 5, (255, 0, 255), cv2.FILLED)

        #data.extend(length)
        # Always send the POST request but check the interval
        current_time = time.time()
        if current_time - last_post_time >= post_interval:
            # Send POST request periodically (every `post_interval` seconds)
            #print(data)

            print(data[-1])
            requests.put('http://127.0.0.1:5000/hand', json=data)
            #sock.sendto(str.encode(str(data)), serverAddressPort)
            last_post_time = current_time  # Update last post time to current time

        # Display the image with hand tracking
        if length <= 50:
            cv2.putText(img2, 'shoot', (100, 100), cv2.FONT_HERSHEY_SIMPLEX, 3, (0, 0, 255) , 3)
    img2 = cv2.flip(img2, 1)

    cv2.imshow("Image", img2)
    cv2.waitKey(1)
