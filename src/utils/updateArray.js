const updateArray = (array, item) => {
  const itemIdx = array.findIndex(({ id }) => id === item.id);

  if (itemIdx < 0) {
    return [...array, item];
  }

  return [...array.slice(0, itemIdx), item, ...array.slice(itemIdx + 1)];
};

export default updateArray;
