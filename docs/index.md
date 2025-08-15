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

## License

&copy; 2025 SATO Yoshiyuki. MIT Licensed.
