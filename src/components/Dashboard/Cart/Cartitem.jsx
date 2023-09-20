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
import { deleteItem } from "../../../services/operations/likeApi";//
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
      dispatch(remove(item.location_id));
     
    
  };

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
      <div>
        <Card
          elevation={6}
          className="p-2 m-5 "
          style={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          <CardMedia
            style={{ height: "450px", objectFit: "cover" }}
            image={item.itemImage}
          />

          <CardContent>
            <Typography gutterBottom variant="h5">
              {item.itemName}
            </Typography>
            <div className="media">
              <Rating value={Number(item.rating)} readOnly />
              <Typography gutterBottom variant="subtitle1">
                {" "}
                out of {item.reviews} reviews
              </Typography>
            </div>
            <div className="media">
              <Typography variant="subtitle1">Ranking</Typography>
              <Typography gutterBottom variant="subtitle1">
                {item.ranking}
              </Typography>
            </div>

            <div className="address">
              {item.location ? (
                <div>
                  <LocationOnIcon />
                  {item.location}
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
            <div>
              <button
                className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-2 px-[8px] text-pink-200 text-lg font-medium"
                onClick={removefromcart}
              >
                <RiDeleteBin6Line />
                <span></span>
              </button>
            </div>
          </CardActions>
        </Card>
      </div>
    </>
  );
};

export default Cartitem;

// {/* <Card */}
// elevation={6}
// className="p-2 m-5 "
// style={{ height: "100%", display: "flex", flexDirection: "column" }}
// >
// <CardMedia
//   style={{ height: "450px", objectFit: "cover" }}
//   image={item.photo.images.large.url}
// />
// <CardContent>
//   <Typography gutterBottom variant="h5">
//     {item.name}
//   </Typography>
//   <div className="media">
//     <Rating value={Number(item.rating)} readOnly />
//     <Typography gutterBottom variant="subtitle1">
//       {" "}
//       out of {item.num_reviews} reviews
//     </Typography>
//   </div>
//   <div className="media">
//     <Typography variant="subtitle1">Ranking</Typography>
//     <Typography gutterBottom variant="subtitle1">
//       {item.ranking ? item.ranking.replace(/#/g, "") : ""}
//     </Typography>
//   </div>
//   {item?.cuisine?.map((khana, index) => (
//     <Chip key={index} size="small" label={khana.name} className="chip" />
//   ))}
//   <div className="address">
//     <LocationOnIcon />
//     {item?.address}
//   </div>
//   <div className="address">
//     <PhoneIcon />
//     {item?.phone}
//   </div>
// </CardContent>
// <CardActions>
//   <Button
//     size="small"
//     color="primary"
//     onClick={() => window.open(item.web_url, "_blank")}
//   >
//     Trip Advisor
//   </Button>
//   <Button
//     size="small"
//     color="primary"
//     onClick={() => window.open(item.website, "_blank")}
//   >
//     Website
//   </Button>
//   <button
//     className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold
//         text-[12px] p-1 px-2  uppercase
//         hover:bg-gray-700 max-w-max
//         hover:bg-gray-700 transition duration-300 ease-in"
//     onClick={removefromcart}
//   >
//     Remove Item
//   </button>
// </CardActions>
// </Card>

// const dispatch = useDispatch();

// dispatch(remove(item.location_id));
// console.log(dispatch(remove(item.location_id)));
