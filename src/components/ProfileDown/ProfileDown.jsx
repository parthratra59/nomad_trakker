import React, { useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import useOnClickOutside from "../ProfileDown/UseOncllickoutside";
import {Menu,MenuItem} from "@mui/material"
import { logout } from "../../services/operations/authApi";
import "./Profiledropdown.css";
const ProfileDown = () => {
  const dispatch = useDispatch();
  const { hey } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  // dom manuplation ke liye use ref use krege ku ki open close horha hai vo dom manuplation hi hai
  const ref = useRef(null);

  if (!hey) {
    console.log("no user");
    return localStorage.setItem("tokenpara", null);
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useOnClickOutside(ref, () => setOpen(false));

  return (
    <>
      <button className="relative " onClick={() => setOpen(true)}>
        <div className="flex items-center">
          <img
            src={hey?.image}
            alt={`profile-${hey?.firstName}`}
            className="aspect-square w-[30px] rounded-full object-cover"
          />
          <AiOutlineCaretDown className="text-sm text-richblack-100" />
        </div>
        {open && (
          <div
            className="absolute top-8 -right-8 z-[9999] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800 dropdown"
            ref={ref}
          >
            <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
              <div className="flex w-full  items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25 z-10 ">
                <VscDashboard className="text-lg" />
                Dashboard
              </div>
            </Link>
            <div
              onClick={() => {
                dispatch(logout(navigate));
                setOpen(false);
              }}
              className="flex items-center w-full  gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
            >
              <VscSignOut />
              Logout
            </div>
          </div>
        )}
      </button>
      
    </>
  );
};

export default ProfileDown;
