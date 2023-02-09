// This function will test the user authentication
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res
      .status(200)
      .send({ message: " User authentication is confirmed from server" });
  } else {
    res.status(401).send({ message: " User not authorized from server" });
  }
}

module.exports.checkAuthenticated = checkAuthenticated;
