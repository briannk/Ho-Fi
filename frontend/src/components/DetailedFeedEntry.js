import React, { useState } from "react";
import { Icon, Modal, Button, Accordion } from "semantic-ui-react";
import ExpenseForm from "./ExpenseForm";
import IncomeForm from "./IncomeForm";

const DetailedFeedEntry = ({
  data,
  entry,
  index,
  activeIndex,
  handleShowMore,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [expand, setExpand] = useState(false);

  const showMore = (e, { index }) => {
    const newIndex = activeIndex === index ? -1 : index;
    handleShowMore(newIndex);
  };
  console.log(data);

  return (
    <div>
      <div
        className={`flex flex-row flex-wrap ${expand ? "h-32" : "h-24"} w-full`}
        data-id={data.id}
        onClick={() => console.log("event")}
      >
        <div
          className="w-1/3 h-full p-4 flex text-2xl sm:text-4xl text-white justify-center items-center"
          style={{ background: entry.color }}
        >
          <b>${data.total.toFixed(2)}</b>
        </div>
        <div
          className="w-2/3 h-full p-4 flex flex-row text-gray-500"
          style={{ border: `2px solid ${entry.color}` }}
        >
          <div className="w-full h-full flex flex-col justify-between gap-1">
            {/* <div className=""> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 justify-center content-evenly items-stretch">
              <div className="mx-auto">
                {data.transactionDate ? (
                  <>
                    <Icon name="calendar alternate" title="Transaction Date" />
                    {data.transactionDate}
                  </>
                ) : (
                  <>
                    <Icon name="calendar alternate" title="Pay Date" />
                    {data.payDate}
                  </>
                )}
              </div>
              <div className="mx-auto hidden sm:block">
                {data.category ? (
                  <>
                    <Icon name="folder" title="Category" />
                    {data.category}
                  </>
                ) : (
                  <>
                    <Icon name="clock outline" title="Frequency" />
                    {data.frequency}
                  </>
                )}
              </div>
              <div className="mx-auto">
                {data.vendor ? (
                  <>
                    <Icon name="building" title="Vendor" />
                    {data.vendor}
                  </>
                ) : (
                  <>
                    <Icon name="money bill alternate outline" title="Source" />
                    {data.source}
                  </>
                )}
              </div>
              <div className="mx-auto hidden sm:block">
                {data.paymentMethod && (
                  <>
                    <Icon name="credit card" title="Payment Method" />
                    {data.paymentMethod}
                  </>
                )}
              </div>
            </div>
            <div className={`mx-auto ${expand ? "block" : "hidden"}`}>
              <Icon name="newspaper" title="Description" />
              {data.description}
            </div>
            <button
              onClick={() => {
                // if (!expense.description) return;
                setExpand(expand ? false : true);
              }}
              className="block"
            >
              {expand ? <Icon name="angle up" /> : <Icon name="angle down" />}
            </button>
            {/* </div> */}

            {/* <Accordion className="mx-auto">
              <Accordion.Title
                active={activeIndex === index}
                index={index}
                onClick={showMore}
                className="flex justify-center"
              >
                {activeIndex === index ? (
                  <Icon name="angle up" />
                ) : (
                  <Icon name="angle down" />
                )}
              </Accordion.Title>
              <Accordion.Content
                active={activeIndex === index}
                className="grid grid-cols-1 sm:grid-cols-2 gap-1 justify-center content-evenly items-stretch"
              >
                <div className="mx-auto">
                  <Icon name="newspaper" />
                  {expense.description}
                </div>
              </Accordion.Content>
            </Accordion> */}
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
                  <ExpenseForm id={data.id} />
                ) : (
                  <IncomeForm id={data.id} />
                )}
              </Modal.Content>
            </Modal>

            <Icon
              name="trash"
              onClick={(e) => {
                e.stopPropagation();
                // add confirmation modal
                console.log("deleting...");
              }}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedFeedEntry;
