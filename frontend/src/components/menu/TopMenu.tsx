import React from "react";
import AppIcon from "../../assets/icon/appicon.png";

function TopMenu() {
  return (
    <div>
      <div className="relative w-[35px] h-[35px]">
        <img
          className="object-contain w-full h-auto"
          src={AppIcon}
          alt="App logo"
        />
      </div>
    </div>
  );
}

export default TopMenu;
