export const searchNote = (query) => {
  return {
    type: "USER_NOTES",
    payload: query,
  };
};
