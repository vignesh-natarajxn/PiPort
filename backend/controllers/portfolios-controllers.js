const uuid = require("uuid/v4");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const getCoordsForAddress = require("../util/location");
const Portfolio = require("../models/portfolio");

let DUMMY_PORTFOLIOS = [
  {
    id: "u1r1",
    creator: "u1",
    title: "Software Development Engineer",
    description: "I like to type stuff.",
    image:
      "https://cutewallpaper.org/22/minimal-programming-wallpapers/930213660.jpg",
    components: [
      {
        title: "Professional Experience",
        description: "",
        image: "",
        components: [
          {
            title: "Experience 1",
            date: "01/01/2001 - 01/01/2010",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image:
              "https://cdn.fansshare.com/photograph/backgroundhd/black-pattern-hd-wallpaper-pattern-1589253890.jpg",
          },
          {
            title: "Experience 2",
            date: "02/02/2002 - 02/02/2020",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image:
              "https://cdn.fansshare.com/photograph/backgroundhd/black-pattern-hd-wallpaper-pattern-1589253890.jpg",
          },
        ],
      },
      {
        title: "Projects",
        description: "",
        image: "",
        components: [
          {
            title: "Experience 1",
            date: "01/01/2001 - 01/01/2010",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image:
              "https://cdn.fansshare.com/photograph/backgroundhd/black-pattern-hd-wallpaper-pattern-1589253890.jpg",
          },
          {
            title: "Experience 2",
            date: "02/02/2002 - 02/02/2020",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image:
              "https://cdn.fansshare.com/photograph/backgroundhd/black-pattern-hd-wallpaper-pattern-1589253890.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "u1r2",
    creator: "u1",
    title: "Embedded Firmware Developer",
    description: "I give life to computers.",
    image: "https://cdn.wallpapersafari.com/23/71/Ow4QZ5.png",
    components: [
      {
        title: "Professional Experience",
        description: "",
        image: "",
        components: [
          {
            title: "Experience 1",
            date: "01/01/2001 - 01/01/2010",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image:
              "https://cdn.fansshare.com/photograph/backgroundhd/black-pattern-hd-wallpaper-pattern-1589253890.jpg",
          },
          {
            title: "Experience 2",
            date: "02/02/2002 - 02/02/2020",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image:
              "https://cdn.fansshare.com/photograph/backgroundhd/black-pattern-hd-wallpaper-pattern-1589253890.jpg",
          },
        ],
      },
      {
        title: "Projects",
        description: "",
        image: "",
        components: [
          {
            title: "Experience 1",
            date: "01/01/2001 - 01/01/2010",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image:
              "https://cdn.fansshare.com/photograph/backgroundhd/black-pattern-hd-wallpaper-pattern-1589253890.jpg",
          },
          {
            title: "Experience 2",
            date: "02/02/2002 - 02/02/2020",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image:
              "https://cdn.fansshare.com/photograph/backgroundhd/black-pattern-hd-wallpaper-pattern-1589253890.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "u2r1",
    creator: "u2",
    title: "Chief Executive Officer - Earth",
    description: "I am your creator.",
    image:
      "https://www.nasa.gov/sites/default/files/styles/full_width/public/thumbnails/image/web_first_images_release.png?itok=g21NrdRw",
    components: [
      {
        title: "Professional Experience",
        description: "",
        image: "",
        components: [
          {
            title: "Experience 1",
            date: "01/01/2001 - 01/01/2010",
            description: "",
            image:
              "https://cdn.fansshare.com/photograph/backgroundhd/black-pattern-hd-wallpaper-pattern-1589253890.jpg",
          },
          {
            title: "Experience 2",
            date: "02/02/2002 - 02/02/2020",
            description: "",
            image:
              "https://cdn.fansshare.com/photograph/backgroundhd/black-pattern-hd-wallpaper-pattern-1589253890.jpg",
          },
        ],
      },
      {
        title: "Projects",
        description: "",
        image: "",
        components: [
          {
            title: "Experience 1",
            date: "01/01/2001 - 01/01/2010",
            description: "",
            image:
              "https://cdn.fansshare.com/photograph/backgroundhd/black-pattern-hd-wallpaper-pattern-1589253890.jpg",
          },
          {
            title: "Experience 2",
            date: "02/02/2002 - 02/02/2020",
            description: "",
            image:
              "https://cdn.fansshare.com/photograph/backgroundhd/black-pattern-hd-wallpaper-pattern-1589253890.jpg",
          },
        ],
      },
    ],
  },
];

const getPortfolioById = async (req, res, next) => {
  const portfolioId = req.params.pid; // { pid: 'p1' }

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
    portfolios = await Portfolio.find({ creator: userId });
  } catch (err) {
    const error = new HttpError("Could not fetch Portfolios", 500);
    return next(error);
  }

  if (!portfolios || portfolios.length === 0) {
    return next(
      new HttpError("Could not find portfolios for the provided user id.", 404)
    );
  }

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

  // let coordinates;
  // try {
  //   coordinates = await getCoordsForAddress(address);
  // } catch (error) {
  //   return next(error);
  // }

  // const title = req.body.title;
  const createdPortfolio = new Portfolio({
    // id: uuid(),
    creator,
    title,
    description,
    image,
    components,
  });

  try {
    await createdPortfolio.save();
  } catch (err) {
    const error = new HttpError("Creating Portfolio Failed", 500);
    return next(error);
  }

  res.status(201).json({ portfolio: createdPortfolio });
};

const updatePortfolio = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
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

const deletePortfolio = (req, res, next) => {
  const portfolioId = req.params.pid;
  if (!DUMMY_PORTFOLIOS.find((p) => p.id === portfolioId)) {
    throw new HttpError("Could not find a portfolio for that id.", 404);
  }
  DUMMY_PORTFOLIOS = DUMMY_PORTFOLIOS.filter((p) => p.id !== portfolioId);
  res.status(200).json({ message: "Deleted portfolio." });
};

exports.getPortfolioById = getPortfolioById;
exports.getPortfoliosByUserId = getPortfoliosByUserId;
exports.createPortfolio = createPortfolio;
exports.updatePortfolio = updatePortfolio;
exports.deletePortfolio = deletePortfolio;
