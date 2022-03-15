const { getFirestore } = require("firebase-admin/firestore");
const { groupData } = require("./formatData");
const { formatPieData } = require("./chartFormatters/formatPieData");
const { formatLineData } = require("./chartFormatters/formatLineData");

const db = getFirestore();

// currently a naive caching system where a map is
// created under the user containing the computed data
// required for visualizing the data
const cacheVisualData = async (user, data, mergeData) => {
  try {
    const doc = await db
      .collection("users")
      .doc(user)
      .collection("expenses")
      .doc("cachedData")
      .get();
    const cacheLastModified = doc.lastModified;
    // if (cacheLastModified === dataLastModified) {
    //   return;
    // }
  } catch (e) {
    console.log(e);
  }

  const keysToExclude = ["id", "total", "description"];
  const selectOptions = Object.keys(data[0]).filter(
    (key) => !keysToExclude.includes(key)
  );

  selectOptions.forEach(async (selectValue) => {
    const groupedData = groupData(data, selectValue);
    const pieData = formatPieData(groupedData);
    const lineData = formatLineData(groupedData);
    //   const selectValue = Object.keys(data)[0];
    // const dataToCache = {
    //   data: { [selectValue]: { pieData, lineData } },
    //   lastModified: new Date(Date.now()),
    // };
    // console.log("dataToCache: ", dataToCache);
    try {
      await db
        .collection("users")
        .doc(user)
        .collection("expenses")
        .doc("cachedData")
        .collection("groups")
        .doc(selectValue)
        .collection("charts")
        .doc("line")
        .set({ lineData }, { merge: mergeData });
      await db
        .collection("users")
        .doc(user)
        .collection("expenses")
        .doc("cachedData")
        .collection("groups")
        .doc(selectValue)
        .collection("charts")
        .doc("pie")
        .set({ pieData }, { merge: mergeData });
      await db
        .collection("users")
        .doc(user)
        .collection("expenses")
        .doc("cachedData")
        .set({ lastModified: new Date(Date.now()) }, { merge: true });
    } catch (e) {
      console.error(e);
    }
  });
};

module.exports = { cacheVisualData };
