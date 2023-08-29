import React, { useState } from "react";
import { logout } from "../../services/operations/authApi";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";
import { useNavigate } from "react-router";
import sidebarLinks from "./Sidebarlinks";
// import SidebarlinkTemplate from "./SidebarlinkTemplate";
import { VscSignOut } from "react-icons/vsc";
import { VscSettingsGear } from "react-icons/vsc";
import Confirmationmodal from "../../components2/important_pages/Confirmationmodal";
const Sidebar = () => {
  const { loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modal, setModal] = useState(null);

  if (authLoading || profileLoading) {
    return (
      <>
        <div className="mt-10">
          <h1>Loading...</h1>
        </div>
      </>
    );
  }
  // flex col means ek column mai rhege

  return (
    <>
      <div className=" bg-white h-[calc(100vh-3.5rem)]">
        <div className="min-w-[288px] flex-col  border-r-richblack-700  py-10">
          <div className="flex flex-col">
            {sidebarLinks.map((link) => {
              return (
                <>
                  {/* <SidebarlinkTemplate
                    key={link.id}
                    link={link}
                    iconName={link.icon}
                  /> */}
                </>
              );
            })}
          </div>

          {/* line ek partition bna rhi hai uska yh code */}

          <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600"></div>

          {/* settings  */}

          <div className="flex flex-col">
            {/* <SidebarlinkTemplate
              link={{ name: "Settings", path: "dashboard/settings" }}
              iconName={VscSettingsGear}
            /> */}

            {/* logout toh ka khi render thodi hoga click hone ke baad modal khulega */}
            {/* isme mainne propdrilling kiya hai onclick kiya */}
            <button
              onClick={() => {
                setModal({
                  text1: "Are You Sure ?",
                  text2: "You want to logout ?",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: () => dispatch(logout(navigate)),
                  btn2Handler: () => dispatch(setModal(null)),
                });
              }}
              // btn2Handler:()=>dispatch(setModal(null))}) iska mtlb cancel jaise hi press kre modal ki state null hojae invisble hojae
              className="text-sm font-medium text-richblack-300 mx-4 my-4"
            >
              <div className="flex items-center gap-x-2 p-4">
                <VscSignOut className="text-lg" />
                <span>Logout</span>
              </div>
            </button>
          </div>
         
        </div>
       
      </div>

      {modal && <Confirmationmodal modalData={modal} />}
    </>
  );
};

export default Sidebar;