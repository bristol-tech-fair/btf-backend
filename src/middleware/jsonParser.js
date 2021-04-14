export default (req, res, next) => {
  if (req.body.json) {
    req.body = JSON.parse(req.body.json);
  }
  next();
};