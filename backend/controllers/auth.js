const admin = require("firebase-admin");

const serviceAccount = require("../serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

const validateToken = async (req, res, next) => {
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = req.headers.authorization.split("Bearer ")[1];
  }
  // /else {
  //   res.status(401).json({ success: false, message: "Missing ID token." });
  //   return;
  // }

  try {
    // console.log(JSON.stringify(idToken));
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    // console.log(decodedIdToken);
    req.user = decodedIdToken;
    console.log("successful validation!");
    next();
    return;
  } catch (error) {
    // res.status(403).json({ success: false, message: error });

    console.log("could not validate user.");
    console.log(error);
    next();
    return;
  }
};

module.exports = { validateToken };
