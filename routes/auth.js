const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login); 
router.post("/register", register);      // "register" controller function is responsible for handling the POST request to create a new user
router.get("/allusers/:id", getAllUsers);
router.post("/setavatar/:id", setAvatar); //sending params
router.get("/logout/:id", logOut);

module.exports = router;
