const uuid = require("uuid/v4");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const getCoordsForAddress = require("../util/location");

let DUMMY_PORTFOLIOS = [
  {
    id: "u1r1",
    creator: "u1",
    title: "Software Development Engineer",
    description: "I like to type stuff.",
    imageUrl:
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
    imageUrl: "https://cdn.wallpapersafari.com/23/71/Ow4QZ5.png",
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
    imageUrl:
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

const getPortfolioById = (req, res, next) => {
  const portfolioId = req.params.pid; // { pid: 'p1' }

  const portfolio = DUMMY_PORTFOLIOS.find((p) => {
    return p.id === portfolioId;
  });

  if (!portfolio) {
    throw new HttpError("Could not find a portfolio for the provided id.", 404);
  }

  res.json({ portfolio }); // => { portfolio } => { portfolio: portfolio }
};

// function getPortfolioById() { ... }
// const getPortfolioById = function() { ... }

const getPortfoliosByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const portfolios = DUMMY_PORTFOLIOS.filter((p) => {
    return p.creator === userId;
  });

  if (!portfolios || portfolios.length === 0) {
    return next(
      new HttpError("Could not find portfolios for the provided user id.", 404)
    );
  }

  res.json({ portfolios });
};

const createPortfolio = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  // const title = req.body.title;
  const createdPortfolio = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PORTFOLIOS.push(createdPortfolio); //unshift(createdPortfolio)

  res.status(201).json({ portfolio: createdPortfolio });
};

const updatePortfolio = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { title, description } = req.body;
  const portfolioId = req.params.pid;

  const updatedPortfolio = { ...DUMMY_PORTFOLIOS.find((p) => p.id === portfolioId) };
  const portfolioIndex = DUMMY_PORTFOLIOS.findIndex((p) => p.id === portfolioId);
  updatedPortfolio.title = title;
  updatedPortfolio.description = description;

  DUMMY_PORTFOLIOS[portfolioIndex] = updatedPortfolio;

  res.status(200).json({ portfolio: updatedPortfolio });
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
