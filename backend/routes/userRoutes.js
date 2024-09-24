import express from "express";
const router = express.Router();
import UserController from "../controllers/userController.js";
import CountryController from "../controllers/countryController.js";
import passport from "passport";
import setAuthHeader from "../middlewares/setAuthHeader.js";
import accessTokenAutoRefresh from "../middlewares/accessTokenAutoRefresh.js";

// Public Routes
router.post("/register", UserController.userRegistration);
router.post("/verify-email", UserController.verifyEmail);
router.post("/login", UserController.userLogin);
router.post("/refresh-token", UserController.getNewAccessToken);
router.post("/reset-password-link", UserController.sendUserPasswordResetEmail);
router.post("/reset-password/:id/:token", UserController.userPasswordReset);

// Protected Routes
router.get(
  "/me",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  UserController.userProfile
);
router.post(
  "/change-password",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  UserController.changeUserPassword
);
router.post(
  "/logout",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  UserController.userLogout
);
router.post(
  "/favorites",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  CountryController.addFavorite
);

router.get(
  "/getfavorites",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  CountryController.getFavorites
);

// Add search history
router.post(
  "/addsearchhistory",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  CountryController.addSearchHistory
);

// Get search history
router.get(
  "/getsearchhistory",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  CountryController.getSearchHistory
);

export default router;
