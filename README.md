# Chrome Error Toaster

This Chrome extension displays error messages as toast notifications in the browser. It captures various types of errors, including script errors, resource loading errors, and unhandled promise rejections, and presents them in a user-friendly manner.

Please note that not all problems will be displayed.

Also, extensions may call `console.error()` internally to notify you of the result of `console.error()`, not that the error occurred in the extension.

## Features

- Displays error messages as toast notifications
- Captures and displays:
  - Script errors
  - Resource loading errors
  - Unhandled promise rejections
  - Console.error() messages
- Customizable appearance through CSS

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yoshi389111/chrome-error-toaster.git
   ```

2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" using the toggle in the top right corner.
4. Click "Load unpacked" and select the cloned repository folder.

## Usage

Once installed, the extension will automatically capture and display error messages as toast notifications. You can customize the appearance of the notifications by modifying the `toast.css` file.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on the GitHub repository.

## License

&copy; 2025 SATO Yoshiyuki. MIT Licensed.
