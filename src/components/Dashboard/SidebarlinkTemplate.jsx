import React from "react";
import { matchPath, NavLink, useLocation } from "react-router-dom";
import * as Icons from "react-icons/vsc"

const SidebarlinkTemplate = ({ link, iconName }) => {
  const Icon = Icons[iconName];
  const location = useLocation();
  // fetches an icon component from the Icons object based on the iconName name se icon ko fetch krta hia
  // konse vale ko yellow kru konse vale faded thku means jis location pr hoga usko color krdega ya highlisght krdega jo upr url mai arha hai location us se name pkdega

  // konse vale ko yellow kru konse vale faded thku means jis location pr hoga usko color krdega ya highlisght krdega jo upr url mai arha hai location us se name pkdega
  // match route likh rhe

  const matchRoute = (route) => {
    return matchPath({path:route}, location.pathname);
}
  // link.path means jo path jai sidebarLink.jsx  mai
  return (
    <>
      <NavLink
        to={link.path}
        className={` py-2 px-4 relative md:px-8 md:py-2 text-sm font-medium transition-all duration-300 ${
          matchRoute(link.path) ? "bg-yellow-800" : "bg-opacity-0"
        }`}
      >
        <div className="flex items-center gap-x-2">
          <Icon className="md:text-lg text-3xl" />
          <span className="hidden md:block">{link.name}</span>
          <span
            className={`absolute bottom-0 left-0 md:top-0 h-[0.2rem] w-full md:h-full md:w-[0.2rem] bg-yellow-50 opacity-0 transition-all duration-300
                  ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}
          ></span>
        </div>
      </NavLink>
    </>
  );
};

export default SidebarlinkTemplate;