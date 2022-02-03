const localToUTC = (date) => {
  let local;
  if (!date) {
    local = new Date(Date.now());
  } else {
    local = new Date(date);
  }
  // const temp = new Date(1637452800 * 1000);
  // console.log(
  //   "utc: ",
  //   temp.getUTCFullYear(),
  //   temp.getUTCMonth() + 1,
  //   temp.getUTCDate()
  // );
  return `${local.getUTCFullYear()}-${(local.getUTCMonth() + 1)
    .toString()
    .padStart(2, 0)}-${local.getUTCDate().toString().padStart(2, 0)}`;
};

const UTCToLocal = (date) => {
  const utc = new Date(date);
  // const utc = new Date(1637452800 * 1000);
  // console.log("local: ", utc.getFullYear(), utc.getMonth() + 1, utc.getDate());
  return `${utc.getFullYear()}-${(utc.getMonth() + 1)
    .toString()
    .padStart(2, 0)}-${utc.getDate().toString().padStart(2, 0)}`;
};

const getWeekAgo = (date) => {
  const present = new Date(date);
  const weekAgo = new Date(present.setDate(present.getUTCDate() - 7));
  return `${weekAgo.getUTCFullYear()}-${(weekAgo.getUTCMonth() + 1)
    .toString()
    .padStart(2, 0)}-${weekAgo.getUTCDate().toString().padStart(2, 0)}`;
};

export { localToUTC, UTCToLocal, getWeekAgo };
