import React from "react";
import { Feed, Header, Icon } from "semantic-ui-react";
import "../stylesheets/feed.css";

const feedStyle =
  "container border border-4 rounded p-4 flex flex-col-reverse gap-y-2";
const feedEventStyle = "container border border-4 rounded p-4";

const RecentFeed = ({ of = "expenses", dataProp = {} }) => {
  const getRelativeTime = (time) => {
    const timeArr = time.split("-");
    const pastTime = new Date(timeArr[0], timeArr[1] - 1, timeArr[2]);
    const currentTime = Date.now();
    const relativeTime = currentTime - pastTime;
    let timeSince;
    switch (true) {
      case relativeTime === 0:
        timeSince = "now";
        break;
      case 0 < relativeTime && relativeTime < 60000:
        timeSince = `${Math.floor(relativeTime / 1000)} second${
          Math.floor(relativeTime / 1000) === 1 ? "" : "s"
        } ago`;
        break;
      case 60000 <= relativeTime && relativeTime < 3600000:
        timeSince = `${Math.floor(relativeTime / 60000)} minute${
          Math.floor(relativeTime / 60000) === 1 ? "" : "s"
        } ago`;
        break;
      case 3600000 <= relativeTime && relativeTime < 86400000:
        timeSince = `${Math.floor(relativeTime / 3600000)} hour${
          Math.floor(relativeTime / 3600000) === 1 ? "" : "s"
        } ago`;
        break;
      default:
        timeSince = `on ${time}`;
    }
    return timeSince;
  };

  const populateFeed = () => {
    console.log("ping");
    return dataProp.data.map((expense) => {
      return (
        <div>
          <Feed.Event onClick={() => console.log("event")}>
            <Feed.Content className="contentStyle">
              <Feed.Summary>
                Paid <b>${expense.total.toFixed(2)}</b> to {expense.vendor}
                <Feed.Date className="hidden md:block">
                  {getRelativeTime(expense.transactionDate)}
                </Feed.Date>
                <Feed.Meta>
                  <Icon
                    name="trash"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("icon");
                    }}
                    className="cursor-pointer"
                  />
                </Feed.Meta>
              </Feed.Summary>
            </Feed.Content>
          </Feed.Event>
        </div>
      );
    });
  };
  return (
    <div>
      <Header as="h3">Recent expenses:</Header>
      <Feed>{populateFeed()}</Feed>
    </div>
  );
};

export default RecentFeed;
