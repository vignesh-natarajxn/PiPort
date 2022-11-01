const express = require("express");

const router = express.Router();

const DUMMY_PORTFOLIOS = [
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

router.get("/:pid", (req, res, next) => {
  const portfolioId = req.params.pid; // { pid: 'p1' }
  const portfolio = DUMMY_PORTFOLIOS.find((p) => {
    return p.id === portfolioId;
  });

  if (!portfolio) {
    const error = new Error("Could not find a portfolio for the provided id.");
    error.code = 404;
    throw error;
  }
  res.json({ portfolio }); // => { portfolio } => { portfolio: portfolio }
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;

  const portfolio = DUMMY_PORTFOLIOS.find((p) => {
    return p.creator === userId;
  });

  if (!portfolio) {
    const error = new Error(
      "Could not find a portfolio for the provided user id."
    );
    error.code = 404;
    return next(error);
  }

  res.json({ portfolio });
});

module.exports = router;
