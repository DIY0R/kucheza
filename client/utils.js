const separation = (str, borders) => {
  if (str[0] != borders[0] || !Array.isArray(borders))
    throw new Error('wrong pattern');
  let readTo = ``;
  const sortToObject = [];
  for (let i = 0; i < str.length; i++) {
    const sym = str[i];
    readTo += sym;
    if ((sym == borders[1] && str[i + 1] == borders[0]) || !str[i + 1]) {
      sortToObject.push(readTo);
      readTo = ``;
    }
  }
  return sortToObject;
};

module.exports = separation;
