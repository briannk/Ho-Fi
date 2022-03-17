const { getFirestore, Timestamp } = require("firebase-admin/firestore");
const { spendingData } = require("../data");
const { buildQuery } = require("./utils/buildQuery");
const isEmpty = require("lodash.isempty");
const { setMeta, getMeta } = require("./utils/meta");

const db = getFirestore();
// db.settings({ ignoreUndefinedProperties: true });

const getExpenses = async (req, res) => {
  try {
    let query;
    let queryParams;
    let snapshot;
    let hasMore;
    let resultSet = [];
    console.log(req.params);

    if (!isEmpty(req.body)) {
      queryParams = JSON.parse(req.body);
      // firestore's "in" operator only allows at most 10 clauses
      // therefore if any group to filter exceeds 10 values,
      // the query must be run multiple times, manually joined
      // and manually paginated as well

      let { dateStart, dateEnd, minTotal, maxTotal, ...remainingParams } =
        queryParams;
      for (const param of Object.values(remainingParams)) {
        if (param.list.length > 10) {
          let clauses;
          for (
            let usedClauses = 0;
            usedClauses < param.list.length && resultSet.length < 10;
            usedClauses += 10
          ) {
            clauses = {
              key: param.key,
              list: param.list.slice(usedClauses, usedClauses + 10),
            };
            query = await buildQuery(
              req.user.uid,
              "expenses",
              queryParams,
              clauses
            );
            snapshot = await query.get();
            // presence of anchor may return nothing, but continue
            // through all clauses until it is found
            if (snapshot.empty) {
              continue;
            }
            resultSet.push(...snapshot.docs);
          }
        }
      }

      if (snapshot.empty && resultSet.length === 0) {
        res
          .status(404)
          .send({ success: true, payload: { success: true, data: null } });
        return;
      }
    } else {
      queryParams = req.query;
      query = await buildQuery(req.user.uid, "expenses", queryParams);
      snapshot = await query.get();
      if (snapshot.empty) {
        res
          .status(404)
          .send({ success: true, payload: { success: true, data: null } });
        return;
      }
      resultSet.push(...snapshot.docs);
    }

    // check if there are more documents after current snapshot
    const checkMore = await query
      .startAfter(snapshot["_materializedDocs"][resultSet.length - 1])
      .limit(1)
      .get();
    if (checkMore.docs.length > 0) {
      hasMore = true;
    }
    // const metaData = await db.collection("users").doc(req.user.uid);
    // const lastModified = metaData.expensesLastModified;

    let docs = resultSet.map((doc) => doc.data());

    let total = docs.reduce((prev, curr) => prev + curr.total, 0);

    let date;
    // reformat transactionDate field to utc string
    docs.forEach((doc) => {
      date = new Date(doc.transactionDate._seconds * 1000);
      doc.transactionDate = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1)
        .toString()
        .padStart(2, 0)}-${date.getUTCDate().toString().padStart(2, 0)}`;
    });

    // a lack of an anchor implies initial run

    // await cacheVisualData(req.user.uid, docs, req.query.anchor ? true : false);

    res.status(200).send({
      success: true,
      payload: {
        data: docs,
        total: total,
        anchor: hasMore ? docs[docs.length - 1].id : null,
      },
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(500).send({ success: false, payload: e });
  }
  return;
};

const getSomeExpenses = async (req, res) => {
  try {
    console.log("date: ", new Date(req.query.dateStart));
    const snapshot = await db
      .collection("users")
      .doc(req.user.uid)
      .collection("expenses")
      .doc("data")
      .collection("expensesData")
      .where("transactionDate", ">=", new Date(req.query.dateStart))
      .where("transactionDate", "<=", new Date(req.query.dateEnd))
      .get();

    if (snapshot.empty) {
      res.status(404).send({ success: true, payload: "No expenses exist." });
    } else {
      const docs = snapshot.docs.map((doc) => doc.data());
      res.status(200).send({ success: true, payload: docs });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ success: false, payload: e });
  }
};

const populateDB = (req, res) => {
  setExpenses(req, spendingData.data);
  res.status(200).send();
};

const setExpense = async (req, res) => {
  const data = JSON.parse(req.body);
  console.log("expense: ", data);
  try {
    let resp;
    if (!data.id) {
      const processedData = {
        vendor: data.vendor,
        total: data.total,
        transactionDate: new Date(data.transactionDate),
        paymentMethod: data.paymentMethod,
        category: data.category,
        description: data.description,
      };

      const docRef = db
        .collection("users")
        .doc(req.user.uid)
        .collection("expenses")
        .doc("data")
        .collection("expensesData")
        .doc();
      resp = await docRef.set({ ...processedData, id: docRef.id });
    } else {
      const processedData = {
        id: data.id,
        vendor: data.vendor,
        total: data.total,
        transactionDate: new Date(data.transactionDate),
        paymentMethod: data.paymentMethod,
        category: data.category,
        description: data.description,
      };

      resp = await db
        .collection("users")
        .doc(req.user.uid)
        .collection("expenses")
        .doc("data")
        .collection("expensesData")
        .doc(processedData.id)
        .set(processedData);
    }
    console.log(resp);
    await db
      .collection("users")
      .doc(req.user.uid)
      .set(
        { "metaData.expensesLastModified": new Date(Date.now()) },
        { merge: true }
      );
    res.status(201).send({ success: true, payload: resp });
  } catch (e) {
    console.log(e);
    res.status(500).send({ success: false, payload: e });
  }
};

// set a batch of documents based off an array of objects
const setExpenses = async (req, data) => {
  const batch = db.batch();
  data.forEach((dataPoint) => {
    const formattedData = {
      ...dataPoint,
      transactionDate: new Date(dataPoint.transactionDate),
    };
    const docRef = db
      .collection("users")
      .doc(req.user.uid)
      .collection("expenses")
      .doc("data")
      .collection("expensesData")
      .doc();
    batch.set(docRef, { ...formattedData, id: docRef.id });
  });
  await batch.commit();
};

const deleteExpense = async (req, res) => {
  // // use in case the document ends up with a subcollection
  // // that must be deleted
  // const path = `users/${req.user.uid}/expenses/${req.params.id}`;
  try {
    // // use in case the document ends up with a subcollection
    // // that must be deleted
    // const resp = await deleteCollection(db, path, 10);
    const resp = await db
      .collection("users")
      .doc(req.user.uid)
      .collection("expenses")
      .doc("data")
      .collection("expensesData")
      .doc(req.params.id)
      .delete();
    res.status(201).send({ success: true, payload: resp });
  } catch (e) {
    console.log(e);
    res.status(500).send({ success: false, payload: e });
  }
};

const getLimit = async (req, res) => {
  try {
    const resp = await getMeta(req.user.uid, "expenses");
    res.status(200).send({ success: true, payload: resp.limit });
  } catch (e) {
    console.log(e);
    res.status(404).send({ success: false, payload: e });
  }
};

const setLimit = async (req, res) => {
  try {
    const data = JSON.parse(req.body);
    const resp = await setMeta(req.user.uid, "expenses", "limit", data);
    res.status(201).send({ success: true, payload: resp });
  } catch (e) {
    console.log(e);
    res.status(500).send({ success: false, payload: e });
  }
};

async function deleteCollection(db, collectionPath, batchSize) {
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.orderBy("__name__").limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, resolve).catch(reject);
  });
}

async function deleteQueryBatch(db, query, resolve) {
  const snapshot = await query.get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {
    // When there are no documents left, we are done
    resolve();
    return;
  }

  // Delete documents in a batch
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick(() => {
    deleteQueryBatch(db, query, resolve);
  });
}

module.exports = {
  getExpenses,
  getSomeExpenses,
  setExpense,
  deleteExpense,
  populateDB,
  getLimit,
  setLimit,
};
