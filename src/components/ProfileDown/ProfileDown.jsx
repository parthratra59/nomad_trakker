import React, { useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import useOnClickOutside from "../ProfileDown/UseOncllickoutside";
import { Menu, MenuItem } from "@mui/material";
import { logout } from "../../services/operations/authApi";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import "./Profiledropdown.css";
const ProfileDown = () => {
  const dispatch = useDispatch();
  const { hey } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // mtlb jaise hi click kre vo apne aap null hokr bnd hojae
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!hey) {
    console.log("no user");
    return localStorage.setItem("tokenpara", null);
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks

  return (
    <>
      <IconButton
        onClick={handleClick}
        className="relative overflow-hidden "
        sx={{ ml: 1 }}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <div className="flex items-center -ml-4 dropdown ">
          <img
            src={hey?.image}
            alt={`profile-${hey?.firstName}`}
            className="aspect-square w-[30px] rounded-full object-cover"
          />
          <AiOutlineCaretDown className="text-sm text-richblack-100" />
        </div>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        style={{ position: "absolute" }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 0.25,
            "& .MuiAvatar-root": {
              width: 15,
              height: 15,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 10,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "richblack-800",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link to="/dashboard/my-profile">
          <MenuItem onClick={handleClose}>
            <div className="gap-x-1 flex justify-center items-center  ">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </MenuItem>
        </Link>
        <Divider />

        <MenuItem
          onClick={() => {
            dispatch(logout(navigate));
            handleClose();
          }}
        >
          <div className="gap-x-1 flex justify-center items-center  ">
            <VscSignOut /> Logout
          </div>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileDown;

// {open && (
//   <div
//     className="absolute top-8 -right-8 z-[9999] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800 dropdown"
//     ref={ref}
//   >
//     <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
//       <div className="flex w-full  items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25 z-10 ">
//         <VscDashboard className="text-lg" />
//         Dashboard
//       </div>
//     </Link>
//     <div
//       onClick={() => {
//         dispatch(logout(navigate));
//         setOpen(false);
//       }}
//       className="flex items-center w-full  gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
//     >
//       <VscSignOut />
//       Logout
//     </div>
//   </div>
// )}
