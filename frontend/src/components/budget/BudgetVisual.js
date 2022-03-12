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

      <Accordion>
        <Accordion.Title
          active={showState.showAccordion}
          onClick={() =>
            showDispatch({
              type: "SHOW_ACCORDION",
              payload: showState.showAccordion,
            })
          }
          className="flex items-center gap-2"
        >
          Filters <Icon name="dropdown" />
        </Accordion.Title>
        <Accordion.Content active={showState.showAccordion}>
          {dataProp && Object.keys(filters).length && (
            <Checkboxes
              dataProp={dataProp}
              filters={filters}
              dispatch={dispatch}
            />
          )}
        </Accordion.Content>
      </Accordion>
    </>
  );
};

export default BudgetVisual;
