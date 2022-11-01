const express = require("express");

const portfoliosControllers = require("../controllers/portfolios-controllers");

const router = express.Router();

router.get("/:pid", portfoliosControllers.getPortfolioById);

router.get("/user/:uid", portfoliosControllers.getPortfolioByUserId);

router.post("/", portfoliosControllers.createPortfolio);

router.patch("/:pid", portfoliosControllers.updatePortfolio);

router.delete("/:pid", portfoliosControllers.deletePortfolio);

module.exports = router;
