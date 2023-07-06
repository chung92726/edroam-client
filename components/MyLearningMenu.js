"use client";

import LearningCard from "./cards/LearningCard";

const MyLearningMenu = () => {
  return (
    <div className="justify-center items-center dropdown-content z-[1] menu shadow absolute top-16 bg-base-200 rounded-box w-80">
      <LearningCard />
    </div>
  );
};

export default MyLearningMenu;
