const uuid = require("uuid/v4");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Portfolio = require("../models/portfolio");
const User = require("../models/user");

const getPortfolioById = async (req, res, next) => {
  const portfolioId = req.params.pid;

  let portfolio;
  try {
    portfolio = await Portfolio.findById(portfolioId);
  } catch (err) {
    const error = new HttpError("Could not find the Portfolio", 500);
    return next(error);
  }

  if (!portfolio) {
    const error = new HttpError(
      "Could not find a portfolio for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ portfolio: portfolio.toObject({ getters: true }) });
};

const getPortfoliosByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let portfolios;
  try {
    // userWithPlaces = await User.findById(userId).populate("places");
    portfolios = await Portfolio.find({ creator: userId });
  } catch (err) {
    const error = new HttpError("Could not fetch Portfolios", 500);
    return next(error);
  }

  // if (!userWithPlaces || userWithPlaces.places.length === 0) {
  // if (!portfolios || portfolios.length === 0) {
  //   return next(
  //     new HttpError("Could not find portfolios for the provided user id.", 404)
  //   );
  // }

  res.json({
    portfolios: portfolios.map((portfolio) =>
      portfolio.toObject({ getters: true })
    ),
  });
};

const createPortfolio = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { creator, title, description, image, components } = req.body;

  const createdPortfolio = new Portfolio({
    // id: uuid(),
    creator,
    title,
    description,
    image:
      "https://nakedsecurity.sophos.com/wp-content/uploads/sites/2/2019/04/shutterstock_407554567-compressor-1.jpg?resize=780,408",
    components,
  });

  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError(
      "Creating portfolio failed, please try again",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPortfolio.save({ session: sess });
    user.portfolios.push(createdPortfolio);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Creating portfolio failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ portfolio: createdPortfolio });
};

const updatePortfolio = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description } = req.body;
  const portfolioId = req.params.pid;

  let portfolio;
  try {
    portfolio = await Portfolio.findById(portfolioId);
  } catch (err) {
    const error = new HttpError("Could not update the Portfolio", 500);
    return next(error);
  }

  portfolio.title = title;
  portfolio.description = description;

  try {
    await portfolio.save();
  } catch (err) {
    const error = new HttpError("Could not update the Portfolio", 500);
    return next(error);
  }

  res.status(200).json({ portfolio: portfolio.toObject({ getters: true }) });
};

const deletePortfolio = async (req, res, next) => {
  const portfolioId = req.params.pid;

  let portfolio;
  try {
    portfolio = await Portfolio.findById(portfolioId).populate("creator");
  } catch (err) {
    const error = new HttpError("Could not delete the Portfolio", 500);
    return next(error);
  }

  if (!portfolio) {
    const error = new HttpError("Could not find portfolio for this id.", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await portfolio.remove({ session: sess });
    portfolio.creator.portfolios.pull(portfolio);
    await portfolio.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete portfolio.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted portfolio." });
};

exports.getPortfolioById = getPortfolioById;
exports.getPortfoliosByUserId = getPortfoliosByUserId;
exports.createPortfolio = createPortfolio;
exports.updatePortfolio = updatePortfolio;
exports.deletePortfolio = deletePortfolio;
