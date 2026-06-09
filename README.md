# Rahn Converter - رهن کامل Converter

A simple and useful browser extension for **Chrome** and **Firefox** that automatically converts rental prices to **full deposit (Rahn)** and shows useful information on Iranian real estate platforms.

## Features

- Automatically detects rent and deposit amounts
- Converts rent to **full Rahn** using your preferred formula (`rent / 0.03`)
- Calculates and shows **Rahn per square meter**
- Works on **Divar.ir**, **Sheypoor.com**, and similar sites
- Clean and beautiful design with Persian numbers support
- Real-time calculation as you browse

## Installation

### Chrome / Edge
1. Download or clone this repository
2. Open `chrome://extensions/`
3. Enable **Developer mode**
4. Click **Load unpacked** and select the project folder

### Firefox
1. Open `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on**
3. Select the `manifest.json` file

> Note: For permanent installation on Firefox, you need to sign the extension.

## How to Use

Just open any property listing on Divar or Sheypoor. The extension will automatically show:
- Rahn Complete (رهن کامل)
- Rahn per square meter (رهن هر متر)

## Technologies

- Manifest V3
- Pure JavaScript
- Works offline

## Contributing

Feel free to open issues or pull requests. Especially welcome:
- Better price detection
- Support for more websites
- Popup settings for custom multiplier

## License

MIT License - Free to use and modify.

---
