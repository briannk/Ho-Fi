const keyToText = (key) => {
  key = key[0].toUpperCase() + key.slice(1);
  key = key.split(/(?=[A-Z])/).join(" ");
  return key;
};

export default keyToText;
