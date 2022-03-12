import React, { useState } from "react";
import { Icon, Modal, Button } from "semantic-ui-react";
import ExpenseForm from "../expenses/ExpenseForm";
import IncomeForm from "../income/IncomeForm";
import { useDataContext } from "../../contexts/DataContext";
import DEFAULT_THEMES from "../../constants/defaultThemes";
import { useMsgContext } from "../../contexts/MsgContext";
import ExpensesEntry from "../expenses/ExpensesEntry";
import IncomeEntry from "../income/IncomeEntry";
import EntryDetails from "./EntryDetails";

const DetailedFeedEntry = ({ data, group, of }) => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [expand, setExpand] = useState(false);

  const { colorThemes, deleteIncome, deleteExpense } = useDataContext();
  const { setMessage, setShowMessage } = useMsgContext();
  console.log(of);
  return (
    <div>
      <div
        className={`flex flex-row flex-wrap ${expand ? "h-32" : "h-24"} w-full`}
        data-id={data.id}
      >
        <div
          className="w-1/3 h-full p-4 flex text-2xl sm:text-4xl text-white justify-center items-center"
          style={{
            background:
              colorThemes[group]?.[data[group].toLowerCase()] ||
              DEFAULT_THEMES["PRIMARY"],
          }}
        >
          <b>${data.total.toFixed(2)}</b>
        </div>
        <div
          className="w-2/3 h-full p-4 flex flex-row text-gray-500"
          style={{
            border: `2px solid ${
              colorThemes[group]?.[data[group].toLowerCase()] ||
              DEFAULT_THEMES["PRIMARY"]
            }`,
          }}
        >
          <div className="w-full h-full flex flex-col justify-between gap-1">
            {of === "expenses" ? (
              <ExpensesEntry data={data} expand={expand} />
            ) : (
              <IncomeEntry data={data} expand={expand} />
            )}
            <button
              onClick={() => {
                setExpand(expand ? false : true);
              }}
              className="block"
            >
              {expand ? <Icon name="angle up" /> : <Icon name="angle down" />}
            </button>
          </div>
          <div className="w-1/6 flex flex-col justify-between content-evenly items-end">
            <Modal
              closeIcon
              onClose={() => setShowModal(false)}
              onOpen={() => setShowModal(true)}
              open={showModal}
              size="mini"
              trigger={
                <Icon
                  name="setting"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="cursor-pointer"
                />
              }
            >
              <Modal.Content>
                {data.transactionDate ? (
                  <ExpenseForm dataProp={data} />
                ) : (
                  <IncomeForm dataProp={data} />
                )}
              </Modal.Content>
            </Modal>

            <Modal
              closeIcon
              onClose={() => setShowConfirm(false)}
              onOpen={() => setShowConfirm(true)}
              open={showConfirm}
              size="mini"
              trigger={<Icon name="trash" className="cursor-pointer" />}
            >
              <Modal.Header>
                Delete this {data.transactionDate ? "expense" : "income"} entry?
              </Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <EntryDetails data={data} of={of} />
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <Button
                  basic
                  color="red"
                  onClick={async () => {
                    try {
                      const resp =
                        of === "expenses"
                          ? await deleteExpense(data)
                          : await deleteIncome(data);
                      setMessage({
                        content: `${
                          of === "expenses" ? "Expense" : "Income"
                        } entry deleted!`,
                        type: "success",
                      });
                    } catch (e) {
                    } finally {
                      setShowMessage(true);
                      setShowConfirm(false);
                    }
                  }}
                >
                  Delete
                </Button>
                <Button basic onClick={() => setShowConfirm(false)}>
                  Cancel
                </Button>
              </Modal.Actions>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedFeedEntry;
