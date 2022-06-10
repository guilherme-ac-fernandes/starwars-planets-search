const sortByPopulationASC = (a, b) => {
  // Proveniente da Documentação
  // link: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  const nameA = a.name.toLowerCase();
  const nameB = b.name.toLowerCase();
  const ONE_NEGATIVE = -1;
  const ONE_POSITIVE = 1;
  if (nameA < nameB) return ONE_NEGATIVE;
  if (nameA > nameB) return ONE_POSITIVE;
  return 0;
};

export default sortByPopulationASC;
