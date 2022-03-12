import React, { useState, useEffect } from "react";
import { sortBy } from "lodash";
import keyToText from "../../utilities/keyToText";
import LoadButton from "./LoadButton";
import isEmpty from "lodash.isempty";
import { useDataContext } from "../../contexts/DataContext";
import "../../stylesheets/semantic-overrides.css";

import { Table, Checkbox } from "semantic-ui-react";

const DataTable = ({ dataProp, selectValue, setData, toggleable = false }) => {
  const [column, setColumn] = useState(null);
  const [direction, setDirection] = useState("descending");
  const [tableVals, setTableVals] = useState([]);
  const [toggledData, setToggledData] = useState([]);

  const { colorThemes } = useDataContext();

  const handleSort = (e, key) => {
    if (key === column) {
      setTableVals((prev) => prev.slice().reverse());
      setDirection(direction === "ascending" ? "descending" : "ascending");
    } else {
      setColumn(key);
      setTableVals((prev) => sortBy(prev, key));
    }
  };

  const TableHeaders = () => {
    return toggleable
      ? [
          <Table.HeaderCell>Toggle</Table.HeaderCell>,
          ...Object.keys(dataProp.data[0].items[0])
            .filter((key) => key !== "id")
            .map((key) => (
              <Table.HeaderCell
                sorted={key === column ? direction : null}
                onClick={(e) => handleSort(e, key)}
              >
                {keyToText(key)}
              </Table.HeaderCell>
            )),
        ]
      : Object.keys(dataProp.data[0].items[0])
          .filter((key) => key !== "id")
          .map((key) => (
            <Table.HeaderCell
              sorted={key === column ? direction : null}
              onClick={(e) => handleSort(e, key)}
            >
              {keyToText(key)}
            </Table.HeaderCell>
          ));
  };

  const TableBody = () => {
    return (
      <Table.Body>
        {tableVals.map((dataPoint) => {
          let color = colorThemes[selectValue]?.[
            dataPoint[selectValue].toLowerCase()
          ].split(",", 3);

          const colorLightened = [color[0], color[1], " 90%)"].join(",");

          return (
            <Table.Row
              style={{
                background: colorLightened,
              }}
              className="row"
            >
              {toggleable && (
                <Table.Cell key={dataPoint.id}>
                  <Checkbox
                    checked={
                      toggledData.find((elem) => {
                        return elem.id === dataPoint.id;
                      })
                        ? true
                        : false
                    }
                    onChange={(e, { checked }) => {
                      if (checked) {
                        const newItem = dataProp.data[0].items.find(
                          (elem) => elem.id === dataPoint.id
                        );

                        setToggledData([...toggledData, newItem]);
                        setData({
                          ...dataProp.data[0],
                          items: [...toggledData, newItem],
                        });
                      } else {
                        const index = toggledData.findIndex(
                          (elem) => elem["id"] === dataPoint["id"]
                        );
                        const newData = [
                          ...toggledData.slice(0, index),
                          ...toggledData.slice(index + 1),
                        ];
                        setToggledData(newData);
                        setData({ ...dataProp.data[0], items: newData });
                      }
                    }}
                  />
                </Table.Cell>
              )}
              {Object.entries(dataPoint).map((value) => {
                if (value[0] === "id") return;
                return (
                  <Table.Cell>
                    {typeof value[1] === "number"
                      ? "$" + value[1].toFixed(2)
                      : value[1]}
                  </Table.Cell>
                );
              })}
            </Table.Row>
          );
        })}
      </Table.Body>
    );
  };

  useEffect(() => {
    if (isEmpty(dataProp.data)) return;
    if (toggleable) {
      setToggledData(dataProp.data[0].items);
    }

    const data = [
      ...dataProp.data
        .map((dataGroup) => dataGroup.items.map((dataPoint) => dataPoint))
        .flat(1),
    ];
    setTableVals(data);
    handleSort(null, dataProp.sortBy || dataProp.data[0].total);
  }, [dataProp]);
  return (
    <>
      {!isEmpty(dataProp.data) && !isEmpty(dataProp.data[0].items) && (
        <div>
          <Table basic="very" sortable celled selectable>
            <Table.Header>
              <Table.Row>
                <TableHeaders />
              </Table.Row>
            </Table.Header>
            <TableBody />
          </Table>
          {dataProp.anchor && (
            <LoadButton dataProp={dataProp} selectValue={selectValue} />
          )}
        </div>
      )}
    </>
  );
};

export default DataTable;
