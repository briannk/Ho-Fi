const dismiss = (handleState) => {
  setTimeout(() => {
    handleState(false);
  }, 5000);
};

export default dismiss;
