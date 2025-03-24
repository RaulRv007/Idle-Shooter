import cv2
from cvzone.HandTrackingModule import HandDetector
import cvzone
import time

cap = cv2.VideoCapture(0)
cap.set(3, 1280)
cap.set(4, 720)
detector = HandDetector(detectionCon=0.8)

while True:
    success, img = cap.read()
    img = cv2.flip(img, 1)
    hands, img = detector.findHands(img, flipType=False)

    if hands:
        lmList = hands[0]['lmList']
        cursor = lmList[8]
        print(lmList[8])
        
        length, info = detector.findDistance(lmList[8], lmList[12])
        print(length)

    cv2.imshow("Img", img)
    cv2.waitKey(1)
