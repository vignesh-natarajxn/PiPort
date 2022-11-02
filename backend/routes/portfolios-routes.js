const express = require("express");
const { check } = require("express-validator");

const portfoliosControllers = require("../controllers/portfolios-controllers");

const router = express.Router();

router.get("/:pid", portfoliosControllers.getPortfolioById);

router.get("/user/:uid", portfoliosControllers.getPortfoliosByUserId);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  portfoliosControllers.createPortfolio
);

router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  portfoliosControllers.updatePortfolio
);

router.delete("/:pid", portfoliosControllers.deletePortfolio);

module.exports = router;
