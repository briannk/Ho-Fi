// The Cloud Functions for Firebase SDK to create Cloud Functions
// and set up triggers.
const functions = require("firebase-functions");
const { getFirestore } = require("firebase-admin/firestore");
const { initializeApp } = require("firebase-admin/app");
initializeApp();
const app = require("./app");

// retrieves app instance which is required to use firebase functionality
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
