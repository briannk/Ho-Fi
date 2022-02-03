const { getFirestore } = require("firebase-admin/firestore");

const db = getFirestore();

// retrieves the document with metadata
const getCachedData = async (user, category) => {
  try {
    const doc = await db
      .collection("users")
      .doc(user)
      .collection(category)
      .doc("cachedData")
      .get();
    return doc.data();
  } catch (e) {
    console.log(e);
  }
};

// stores metadata for the specified category
const setCachedData = async (user, category, key, data) => {
  console.log(user, category, key, data);
  try {
    await db
      .collection("users")
      .doc(user)
      .collection(category)
      .doc("cachedData")
      .set({ [key]: data }, { merge: true });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { getCachedData, setCachedData };
