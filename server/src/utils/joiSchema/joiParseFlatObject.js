const parseFlatObject = (input) => {
  if (!input) {
    return {};
  }
  if (Array.isArray(input)) {
    return input.map((obj) => parseObject(obj));
  } else {
    return parseObject(input);
  }
};

const parseObject = (obj) => {
  const result = {};
  if (!obj) {
    return result;
  }
  for (const [key, value] of Object.entries(obj)) {
    const keys = key.split(".");
    keys.reduce((acc, k, i) => {
      if (i === keys.length - 1) {
        acc[k] = value;
      } else {
        acc[k] = acc[k] || {};
      }
      return acc[k];
    }, result);
  }
  return result;
};

module.exports = parseFlatObject;
