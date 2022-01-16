import React from "react";
import LineViz from "./LineViz";
import BudgetLimit from "./BudgetLimit";
import Checkboxes from "./Checkboxes";
import keyToText from "../utilities/keyToText";

import { Accordion, Icon } from "semantic-ui-react";

const BudgetVisual = ({
  state,
  dispatch,
  dataProp,
  formattedData,
  showState,
  showDispatch,
}) => {
  console.log(formattedData);
  return (
    <>
      {formattedData.data[0].items.length && (
        <LineViz dataProp={formattedData} showArea={true} />
      )}

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
          {dataProp && Object.keys(state).length && (
            <Checkboxes dataProp={dataProp} state={state} dispatch={dispatch} />
          )}
        </Accordion.Content>
      </Accordion>
    </>
  );
};

export default BudgetVisual;
