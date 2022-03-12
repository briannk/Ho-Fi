import React from "react";
import { Link } from "react-router-dom";
import { Image } from "semantic-ui-react";
import DEFAULT_THEMES from "../../constants/defaultThemes";
import missingImg from "../../assets/img/missing.gif";

const Missing = ({ item }) => {
  return (
    <div
      className="container mx-auto flex flex-col items-center gap-2 text-lg"
      styles={{ border: `1em solid ${DEFAULT_THEMES["PRIMARY"]}` }}
    >
      <Image src={missingImg} />
      <div className="w-full flex justify-center border-4 rounded-sm  p-4">
        <span>
          No data to display for these dates! You can fix that by
          <Link to={`/${item}/add`}> adding {item}!</Link>
        </span>
      </div>
    </div>
  );
};

export default Missing;
