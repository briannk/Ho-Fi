import React from "react";

const ToolTipValues = ({ id, data }) => {
  const group = data.find((point) => point.id === id);

  return (
    <ul style={{ listStyle: "none", margin: 0 }}>
      {group &&
        group.items.map((point) => (
          <li>
            ${point.total.toFixed(2)}
            {group.id === "Other" && `(${point.vendor || point.source})`}
          </li>
        ))}
    </ul>
  );
};

export default ToolTipValues;
