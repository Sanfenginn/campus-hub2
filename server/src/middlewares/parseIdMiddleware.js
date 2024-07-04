const parseId = (req, res, next) => {
  if (req.params.id) {
    req.params.id = Number(req.params.id);
  } else if (req.query.id) {
    req.query.id = Number(req.query.id);
  }
  next();
};

module.exports = parseId;
