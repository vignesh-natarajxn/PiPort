import React from "react";
import { useParams } from "react-router-dom";

import ResumeList from "../components/ResumeList";

const DUMMY_RESUMES = [
  {
    id: "u1r1",
    creator: "u1",
    title: "Software Development Engineer",
    description: "I like to type stuff.",
    imageUrl:
      "https://cutewallpaper.org/22/minimal-programming-wallpapers/930213660.jpg",
    
  },
  {
    id: "u1r2",
    creator: "u1",
    title: "Embedded Firmware Developer",
    description: "I give life to computers.",
    imageUrl:
    "https://cdn.wallpapersafari.com/23/71/Ow4QZ5.png",
  },
];

const UserResumes = () => {
  const userId = useParams().userId;
  const loadedResumes = DUMMY_RESUMES.filter(
    (resume) => resume.creator === userId
  );
  return <ResumeList items={loadedResumes} />;
};

export default UserResumes;
