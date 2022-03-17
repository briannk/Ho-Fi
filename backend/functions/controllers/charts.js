const { getFirestore } = require("firebase-admin/firestore");

const db = getFirestore();

const getChart = async (req, res) => {
  //   const selectValue = req.query.selectValue.json();
  console.log(req.query.selectValue, ", ", req.param.chart);
  try {
    const doc = await db
      .collection("users")
      .doc(req.user.uid)
      .collection("expenses")
      .doc("cachedData")
      .collection("groups")
      .doc(req.query.selectValue)
      .collection("charts")
      .doc(req.params.chart)
      .get();
    res.status(200).send({ success: true, payload: doc.data() });
  } catch (e) {
    console.log(e);
    res.status(500).send({ success: false, payload: e });
  }
  console.log();
};

module.exports = { getChart };
