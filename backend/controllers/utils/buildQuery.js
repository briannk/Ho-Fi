const { getFirestore, Timestamp } = require("firebase-admin/firestore");
const isEmpty = require("lodash.isempty");

const db = getFirestore();

const buildQuery = async (user, category, queryParams, include) => {
  let remainingParams;
  let query = db
    .collection("users")
    .doc(user)
    .collection(category)
    .doc("data")
    .collection(`${category}Data`);
  if (queryParams.dateStart && queryParams.dateEnd) {
    let date;
    date = category === "expenses" ? "transactionDate" : "payDate";

    query = query
      .where(date, ">=", Timestamp.fromDate(new Date(queryParams.dateStart)))
      .where(date, "<=", Timestamp.fromDate(new Date(queryParams.dateEnd)))
      .orderBy(date, "desc");
    ({ dateStart, dateEnd, ...remaining } = queryParams);
    remainingParams = remaining;
  }
  if (queryParams.minTotal && queryParams.maxTotal) {
    query = query
      .where(mintotal, ">=", queryParams.minTotal)
      .where(maxtotal, "<=", queryParams.maxTotal);
    ({ minTotal, ...remaining } = remainingParams);
    remainingParams = remaining;
  }
  if (include) {
    query = query.where(include.key, "in", include.list);
  }
  // if (queryParams.orderBy) {
  //   query = query.orderBy(queryParams.orderBy, "desc");
  // }
  if (queryParams.anchor) {
    const snapshot = await db
      .collection("users")
      .doc(user)
      .collection(category)
      .doc("data")
      .collection(`${category}Data`)
      .where("id", "==", queryParams.anchor)
      .get();
    const anchor = snapshot.docs[snapshot.docs.length - 1];
    query = query.startAfter(anchor);
  }
  // if (isEmpty(remainingParams)) {
  //   query = query.limit(10);
  // }
  return query.limit(10);
};

module.exports = { buildQuery };
