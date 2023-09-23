import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
  Rating,
  Button,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
// import { Link } from "react-router-dom";
import { deleteItem } from "../../../services/operations/likeApi"; //
import { useNavigate } from "react-router-dom";
import { remove } from "../../../redux/slices/Likeslice";
const Cartitem = ({ item }) => {
  const { tokenpara } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const removefromcart = () => {
    // Attempt to delete the item
    // deleteItem(tokenpara, item._id);
    // If deletion is successful, set the local state to indicate removal
    // yh hi item.location_id action.payload hai
    dispatch(remove(item.itemId));

    deleteItem(tokenpara, item.itemId);
  };

  console.log("nextlevel", item);
  // bda sa function hai yh re rendering vgh mai toh redux use krte hai thik hai

  // SPLIT FUNCTION TO CONVERT STRING INTO ARRAY
  // isme , ke basis pr split krta then array mai dalta
  // const text = "apple,banana,cherry";
  // const fruits = text.split(",");

  // // Map over the array and render each fruit as an HTML element
  // const fruitElements = fruits.map((fruit, index) => (
  //   <div key={index}>{fruit}</div>
  // ));

  // yh format hota piche hm bhar vala krke agye hai ab ek div and then card vala
  // <div>
  //   <div>
  //     <card>
  //     </card>
  //   </div>
  // </div>

  return (
    <>
      <div className="flex w-full flex-wrap items-start justify-between gap-6 border-b border-white pb-6 false pt-6 p-4 shihai">
        <div className="flex flex-1 flex-col gap-4 xl:flex-row p-2 khatam ">
          <img
            className="md:h-[148px] md:w-[220px] h-[100px] w-[180px]  rounded-lg object-cover subscribe"
            alt="item.itemName"
            src={item.itemImage}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" style={{ color: "white" }}>
              <div className="font-bold english">{item.itemName}</div>
            </Typography>
            <div className="media mt-4 ">
              <Rating
                value={Number(item.itemRating)}
                readOnly
                style={{
                  "& .MuiRating-icon": {
                    borderColor: "white",
                  },
                }}
              />

              <Typography
                gutterBottom
                variant="subtitle1"
                style={{ color: "whitesmoke" }}
              >
                {" "}
                out of {item.itemReviews} reviews
              </Typography>
            </div>
            <div className="media gap-x-28 text-white">
              <Typography variant="subtitle1">Ranking</Typography>
              <Typography gutterBottom variant="subtitle1">
                <div className="kaliyan">{item.itemRanking}</div>
              </Typography>
            </div>

            <div className="address color-white">
              {item.location ? (
                <div>
                  <LocationOnIcon />
                  {item.itemLocation}
                </div>
              ) : (
                <div className="hidden">""</div>
              )}
            </div>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => window.open(item.tripAdviserUrl, "_blank")}
            >
              Trip Advisor
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={() => window.open(item.websiteUrl, "_blank")}
            >
              Website
            </Button>
            <div className="ml-3">
              <button
                className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-2 px-[8px] text-pink-200 text-lg font-medium"
                onClick={removefromcart}
              >
                <RiDeleteBin6Line />
                <span></span>
              </button>
            </div>
          </CardActions>
        </div>
      </div>
    </>
  );
};

export default Cartitem;

