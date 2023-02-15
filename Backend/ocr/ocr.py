from PIL import Image
import pytesseract 
import numpy as np
import cv2

# filename = 'medscape/Backend/ocr/da.png'
filename = 'medscape/Backend/ocr/da.jpg'

img = np.array(Image.open(filename))
norm_img = np.zeros((img.shape[0], img.shape[1]))

img = cv2.normalize(img, norm_img, 0, 255, cv2.NORM_MINMAX)
img = cv2.threshold(img, 100, 255, cv2.THRESH_BINARY)[1]
img = cv2.GaussianBlur(img, (1, 1), 0)

text = pytesseract.image_to_string(img)
print(text)