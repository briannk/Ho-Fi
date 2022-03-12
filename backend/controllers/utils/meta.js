const { getFirestore } = require("firebase-admin/firestore");

const db = getFirestore();

// retrieves the document with metadata
const getMeta = async (user, category) => {
  try {
    const doc = await db
      .collection("users")
      .doc(user)
      .collection(category)
      .doc("metaData")
      .get();
    return doc.data();
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// stores metadata for the specified category
const setMeta = async (user, category, key, data) => {
  try {
    await db
      .collection("users")
      .doc(user)
      .collection(category)
      .doc("metaData")
      .set({ [key]: data }, { merge: true });
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = { getMeta, setMeta };
