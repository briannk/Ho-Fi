import React from "react";
import LineViz from "../charts/LineViz";
import BudgetLimit from "./BudgetLimit";
import Checkboxes from "./Checkboxes";

import { Accordion, Icon } from "semantic-ui-react";

const BudgetVisual = ({
  filters,
  dispatch,
  dataProp,
  formattedData,
  showState,
  showDispatch,
  selectValue,
}) => {
  return (
    <>
      <LineViz
        dataProp={formattedData}
        selectValue={selectValue}
        showArea={true}
      />

      <BudgetLimit showState={showState} showDispatch={showDispatch} />

      <Accordion
        className={`my-2 border-gray-700 border-opacity-10 ${
          showState.showAccordion ? "border-b-2" : ""
        }`}
      >
        <Accordion.Title
          active={showState.showAccordion}
          onClick={() =>
            showDispatch({
              type: "SHOW_ACCORDION",
              payload: showState.showAccordion,
            })
          }
          className="flex items-center p-4 border-none rounded text-lg gap-2 bg-gray-700 bg-opacity-10"
        >
          Filters{" "}
          <Icon name="dropdown" className="flex justify-center items-center" />
        </Accordion.Title>
        <Accordion.Content active={showState.showAccordion}>
          {dataProp && Object.keys(filters).length ? (
            <Checkboxes
              dataProp={dataProp}
              filters={filters}
              dispatch={dispatch}
            />
          ) : null}
        </Accordion.Content>
      </Accordion>
    </>
  );
};

export default BudgetVisual;
