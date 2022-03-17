const { createWorker } = require("tesseract.js");

const worker = createWorker({
  logger: (m) => console.log(m), // Add logger here
});

const parseImg = async (img) => {
  await worker.load();
  await worker.loadLanguage("eng");
  await worker.initialize("eng");
  const {
    data: { text },
  } = await worker.recognize(img);
  console.log(text);
  await worker.terminate();
};

export default parseImg;
