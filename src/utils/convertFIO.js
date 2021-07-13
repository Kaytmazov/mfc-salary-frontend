const convertFIO = (fio) => {
  const array = fio.split(' ');

  switch (array.length) {
    case 3:
      return `${array[0]} ${array[1][0]}. ${array[2][0]}.`;

    case 2:
      return `${array[0]} ${array[1][0]}.`;

    case 1:
      return array[0];

    default:
      return fio;
  }
};

export default convertFIO;
