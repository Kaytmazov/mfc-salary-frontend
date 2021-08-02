const generateArrayOfYears = (min = 2016, max = new Date().getFullYear()) => {
  const years = [];

  for (let i = max; i >= min; i--) {
    years.push(i);
  }

  return years;
};

export default generateArrayOfYears;
