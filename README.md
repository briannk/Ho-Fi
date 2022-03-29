# Ho-Fi

An expense/income/budget tracker for the beautiful and successful. 

###### Note: This web app does not guarantee you will become beautiful and/or successful.

If you are only interested in using the web application you can access it [here](ho-fi-598a7.web.app).

## Installation

Clone the repo (`git clone https://github.com/briannk/Ho-Fi.git`) and install dependencies (`npm i`) in the frontend folder as well as in the functions folder within backend.


In order to run the frontend, you must have credentials linked to your Firebase app with [authentication](https://firebase.google.com/docs/auth) enabled. Once you create a project for the app, you can retrieve them through [these instructions](https://support.google.com/firebase/answer/7015592?hl=en#zippy=%2Cin-this-article) and set them in your .env file. Once you have done this, you should be able to spin up a development server with `npm start` and view the app on localhost:3000 (default port).


For the backend, you can [run an emulator](https://firebase.google.com/docs/rules/emulator-setup) to test calls to the datastore used by the server, Firestore, as well as Firebase Functions for the API endpoints. Make sure to update the fetch URLs on the frontend to reflect your emulator URLs to properly see any resulting operations.

**NOTE:** If you do test/modify the code and something goes wrong, you may run into an issue where you cannot run the emulators. If this occurs, you can use `npx kill-port <port number>` with the port number coinciding with the appropriate ports for each Firebase service that is being emulated. For whatever reason, Firebase does not resolve issues on its own and leaves the ports occupied so they must be cleared manually if an error occurs.

## Notes

Feel free to post any issues or bugs or maybe even a pull request and I will look into it! 


## References

[Image Parsing (Planned Feature)](https://tesseract.projectnaptha.com/)
