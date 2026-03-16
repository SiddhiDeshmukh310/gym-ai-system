import cv2
import mediapipe as mp
import numpy as np

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(max_num_hands=2)
mp_drawing = mp.solutions.drawing_utils


def generate_frames():

    cap = cv2.VideoCapture(0)

    while True:

        success, frame = cap.read()

        if not success:
            break

        frame = cv2.resize(frame,(960,720))

        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = hands.process(image)

        posture = "Detecting..."

        if results.multi_hand_landmarks:

            for hand_landmarks in results.multi_hand_landmarks:

                mp_drawing.draw_landmarks(
                    frame,
                    hand_landmarks,
                    mp_hands.HAND_CONNECTIONS
                )

                wrist = hand_landmarks.landmark[0]
                index = hand_landmarks.landmark[8]

                # simple posture rule
                if index.y < wrist.y:
                    posture = "Correct Grip"
                    color = (0,255,0)
                else:
                    posture = "Wrong Grip"
                    color = (0,0,255)

                cv2.putText(frame,
                            posture,
                            (50,100),
                            cv2.FONT_HERSHEY_SIMPLEX,
                            1,
                            color,
                            3)

        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')