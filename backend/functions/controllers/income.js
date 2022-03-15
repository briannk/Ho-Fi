const { getFirestore, Timestamp } = require("firebase-admin/firestore");
const { payData } = require("../data");
const { buildQuery } = require("./utils/buildQuery");
const isEmpty = require("lodash.isempty");

const db = getFirestore();

const getIncome = async (req, res) => {
  try {
    let query;
    let queryParams;
    let snapshot;
    let hasMore;
    let resultSet = [];

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
              "income",
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
      query = await buildQuery(req.user.uid, "income", queryParams);
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
    // const lastModified = metaData.IncomeLastModified;

    let docs = resultSet.map((doc) => doc.data());

    let total = docs.reduce((prev, curr) => prev + curr.total, 0);

    let date;
    // reformat transactionDate field to utc string
    docs.forEach((doc) => {
      date = new Date(doc.payDate._seconds * 1000);
      doc.payDate = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1)
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

const getSomeIncome = async (req, res) => {
  try {
    console.log("date: ", new Date(req.query.dateStart));
    const snapshot = await db
      .collection("users")
      .doc(req.user.uid)
      .collection("income")
      .doc("data")
      .collection("incomeData")
      .where("transactionDate", ">=", new Date(req.query.dateStart))
      .where("transactionDate", "<=", new Date(req.query.dateEnd))
      .get();

    if (snapshot.empty) {
      res.status(404).send({ success: true, payload: "No Income exist." });
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
  setIncomes(req, payData.data);
  res.status(200).send();
};

const setIncome = async (req, res) => {
  const data = JSON.parse(req.body);
  try {
    let resp;
    if (!data.id) {
      const processedData = {
        source: data.source,
        total: data.total,
        payDate: new Date(data.payDate),
        frequency: data.frequency,
        description: data.description,
      };

      const docRef = db
        .collection("users")
        .doc(req.user.uid)
        .collection("income")
        .doc("data")
        .collection("incomeData")
        .doc();
      resp = await docRef.set({ ...processedData, id: docRef.id });
    } else {
      const processedData = {
        id: data.id,
        source: data.source,
        total: data.total,
        payDate: new Date(data.payDate),
        frequency: data.frequency,
        description: data.description,
      };

      resp = await db
        .collection("users")
        .doc(req.user.uid)
        .collection("income")
        .doc("data")
        .collection("incomeData")
        .doc(processedData.id)
        .set(processedData);
    }
    console.log(resp);
    await db
      .collection("users")
      .doc(req.user.uid)
      .set(
        { "metaData.incomeLastModified": new Date(Date.now()) },
        { merge: true }
      );
    res.status(201).send({ success: true, payload: resp });
  } catch (e) {
    console.log(e);
    res.status(500).send({ success: false, payload: e });
  }
};

// set a batch of documents based off an array of objects
const setIncomes = async (req, data) => {
  const batch = db.batch();
  data.forEach((dataPoint) => {
    const formattedData = {
      ...dataPoint,
      payDate: new Date(dataPoint.payDate),
    };
    const docRef = db
      .collection("users")
      .doc(req.user.uid)
      .collection("income")
      .doc("data")
      .collection("incomeData")
      .doc();
    batch.set(docRef, { ...formattedData, id: docRef.id });
  });
  await batch.commit();
};

const deleteIncome = async (req, res) => {
  // // use in case the document ends up with a subcollection
  // // that must be deleted
  // const path = `users/${req.user.uid}/Income/${req.params.id}`;
  try {
    // // use in case the document ends up with a subcollection
    // // that must be deleted
    // const resp = await deleteCollection(db, path, 10);
    const resp = await db
      .collection("users")
      .doc(req.user.uid)
      .collection("income")
      .doc("data")
      .collection("incomeData")
      .doc(req.params.id)
      .delete();
    console.log(resp);
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
  getIncome,
  getSomeIncome,
  setIncome,
  deleteIncome,
  populateDB,
};
