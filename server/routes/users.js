var express = require("express");
const router = express.Router();
const utils = require("./utils");

let userController = require("../controllers/userController");

module.exports.initUserRoutes = (passport) => {
  // Get the user Dashboard (Verify if the user is authenticated)
  router.get("/users/dashboard", utils.checkAuthenticated);
  // User Logout
  router.get("/users/logout", function (req, res) {
    req.logout(function (err) {
      if (err) {
        res.status(500).send({ message: "Error in Logout" });
      } else {
        res.status(200).send({ message: "Logout successffuly" }); //info contains the error message
      }
    });
  });

  /** Post user Register */
  router.post("/users/register", userController.createUser);
  /** Post user Login */
  router.post(
    "/users/login",
    // FIND SOLUTION HERE FOR RETURNING STATUS ERROR
    (req, res, next) => {
      passport.authenticate("local", function (err, user, info) {
        if (err) {
          return next(err);
        } //error exception
        // user will be set to false, if not authenticated
        if (!user) {
          res.status(401).send({
            message: "User not found ! Verify your adress or your password",
          }); //info contains the error message
        } else {
          // if user authenticated maintain the session
          req.logIn(user, function () {
            res.status(200).send("ok");
          });
        }
      })(req, res, next);
    }
  );
};

module.exports.usersRoutes = router;
