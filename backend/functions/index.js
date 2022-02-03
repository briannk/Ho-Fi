// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require("firebase-functions");
const { getFirestore } = require("firebase-admin/firestore");
const { getApp, initializeApp } = require("firebase-admin/app");

const { response } = require("../app");
const app = require("../app");
// const cors = require("cors");

console.log("index");

// retrieves app instance which is required to use firebase functionality
initializeApp();

const db = getFirestore();
db.settings({ ignoreUndefinedProperties: true });

exports.app = functions.https.onRequest(app);

// test once in production
exports.createUserEntry = functions.auth.user().onCreate((user) => {
  console.log(user);
  try {
    db.collection("users").doc(user.uid).set({
      uid: user.uid,
    });
    console.log(`Entry for user ${user.uid} successfully created.`);
  } catch (e) {
    console.log(e);
  }
});

exports.test = functions.https.onRequest((request, response) => {
  console.log(request.headers.authorization);
  response.send(`User info: ${request.headers}`);
});

exports.createUser = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.set("Access-Control-Allow-Origin", "*");
  response.send("Hello from Firebase!");
});
