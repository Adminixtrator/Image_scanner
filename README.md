<div align="center">

![hng](https://res.cloudinary.com/iambeejayayo/image/upload/v1554240066/brand-logo.png)

<br>

</div>

## :page_with_curl: _About_
- This is an Image Scanner for Docufix
- It extracts Image texts

## :page_with_curl: _Installation Guide_

**1)** Fire up your favourite console & clone this repo somewhere:

__`❍ git clone https://github.com/Adminixtrator/Image_scanner.git`__

**2)** Enter this directory:

__`❍ cd Image_scanner`__

**3)** Install other python packages/dependencies using the requirement file:

__`❍ pip install -r requirements.txt`__

**4)** Install tesseract-ocr:

__`❍ sudo apt-get install tesseract-ocr`__

**5)** Get TESSDATA_PREFIX:

__`❍ sudo find / -name "tessdata"`__  *Copy the path*

**6)** Set TESSDATA_PREFIX:

__`❍ export TESSDATA_PREFIX=path_you_copied`__

**7)** Run the App:

__`❍ python ImageScanner.py`__

**8)** Open your browser and type in this URL. Upload an Image to be scanned:

__`❍ http://127.0.0.1:8000/`__

__*Happy developing!*__
