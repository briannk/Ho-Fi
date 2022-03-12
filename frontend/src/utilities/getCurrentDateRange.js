import { localToUTC, getWeekAgo } from "./formatDate";

// whenever a fresh set of data is needed
const getCurrentDateRange = () => {
  const currentDate = localToUTC();
  console.log(localToUTC);
  const weekAgo = getWeekAgo(currentDate);
  return { dateStart: weekAgo, dateEnd: currentDate };
};

export default getCurrentDateRange;
