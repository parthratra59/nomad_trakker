import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
  Rating,
} from "@mui/material";
import "./PlaceDetails.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
// import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../../redux/slices/Likeslice";
import { useNavigate } from "react-router-dom";
import { addTocartdb } from "../../services/operations/likeApi";

const PlaceDetails = ({ hello, refprop, selectkiya }) => {
  useEffect(() => {
    if (selectkiya && refprop?.current) {
      refprop.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectkiya, refprop]);
  const navigate = useNavigate();

  // likecart mai jarha hai usdr se cart item vala and cart vala fetch krega ya delte krega dependency hi khtm hogyi
  const { likeElemets } = useSelector((state) => state.like);
  const { tokenpara } = useSelector((state) => state.auth);
  // mujeab removefromcart and add to cart function create krne vo dispatch function ke through kr skte
  const dispatch = useDispatch();

  const addtocart = () => {
    // yh cart ke andr item add krta hai
    dispatch(add(hello));
    
    // console.log("kinneaye",dispatch(add(hello)));
    // like login sam explanation do baar function call hojaega age mai console.log mai bhi likh rha add 

    addTocartdb(hello, tokenpara);
   
  };
  const gotoCart = () => {
    // yh remove krta cart mai se item
    // post.id bhi paas kr rhe because remove toh id se bhi hojaegi

    navigate("/dashboard/cart");
    toast.success("Switch to Wishlist ");
  };

  // console.log(hello)
  // idhr address vgrh sb arha hello usme se hmne name liya hai abhi
  // yh loayout vaisa hi rha
  // jo hmne material ui mai tha
  //grid container spacing
  //  grid items
  //  card
  //  cardmedia
  //     photo ke liye aur video ke liye
  //  /cardmedia
  //  card content
  //   Typography heading ke liye
  // /card content
  // card actions
  // buttons ke liye
  // /card actions

  // grid container main cointainer tha
  // uske baad mapping strt hui <grid  items mai
  // ab uke card start hua

  // jo maine map mai kiya hai
  //  {/* paper tb use kro jb random card dalne ho aur agr chaiye ek ke niche ek chaiye ho toh material ui se hojata */}
  // const[liked,setLiked]=useState([])
  // const handler=()=>{
  //     if(liked.includes(hello.id))
  //     {
  //         // filter ek array return krta iska mtlb yh hai filter ke andr se vohi japaega jiski id books.id nhi hogi jiski books.id hogyi vo nhi ja paega
  //         // image hai likedfilter.png usme dekho
  //         setLiked(liked.filter((elementid)=>elementid!==hello.id))
  //         toast.warning("Like removed")

  //     }
  //     else{
  //         // agr mera abhi empty array hai
  //         if(liked.length===0)
  //         {
  //             // yh vali id insert krdi
  //             setLiked([hello.id])
  //         }
  //         else
  //         {
  //             // abhi non empty hai tb bhi aur muje insert krni hai
  //             // purane vale elements spread operator se daaal diye
  //             setLiked((puravale_elements)=>[...puravale_elements,hello.id])

  //         }
  //         toast.success("Liked Successfully")
  //     }
  // }

  return (
    <>
      {/* grid container  and  grid items piche hi kr diye hai list mai uske andr yh ata na cardtph yh vo hai*/}
      <Card elevation={6}>
        <CardMedia
          style={{ height: 350 }}
          image={hello.photo.images.large.url}
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {hello.name}
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            lg={12}
            xs={12}
            className="media"
          >
            <Rating value={Number(hello.rating)} readOnly></Rating>
            <Typography gutterBottom variant="subtitle1">
              {" "}
              out of {hello.num_reviews} reviews
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            lg={12}
            xs={12}
            className="media"
          >
            <Typography variant="subtitle1">Ranking</Typography>
            <Typography gutterBottom variant="subtitle1">
              {hello.ranking ? hello.ranking.replace(/#/g, "") : ""}
            </Typography>
          </Box>

          {/* award hai nhi hmare side mai */}
          {/* loop lgana hota jb ek se jyada chij hoti toh map lagate react mai*/}
          {/* {hello?.award?.map((awarding)=>{ */}

          {/* <Box my={1} display="flex" justifyContent='space-between'> */}
          {/* my at margin in yaxis */}
          {/* <img src={awarding.image.small}  alt='awarding.display_name'/> */}
          {/* <Typography variant='subtitle2' color="textSecondary">{awarding.display_name}</Typography> */}
          {/* </Box> */}
          {/* })} */}
          {/* hmko ? hmesha lgana hm ko isure krna ki phele se ho kuch usme map krne se phele */}
          {hello?.cuisine?.map((khana, index) => (
            <Chip
              key={index}
              size="small"
              label={khana.name}
              className="chip"
            />
          ))}

          {/* typography ke sath gutterBottom use hota hai */}
          <Box marginTop={"20px"}>
            <Typography
              gutterBottom
              variant="subtitle2"
              color="textSecondary"
              className="addressing"
            >
              {hello?.address ? (
                <div>
                  <LocationOnIcon />
                  {hello.address}
                </div>
              ) : (
                <div className="hidden">""</div>
              )}
            </Typography>
          </Box>
          <Box
            marginTop={"20px"}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Typography
              gutterBottom
              variant="subtitle2"
              color="textSecondary"
              className="addressing"
            >
              {hello?.phone ? (
                <div>
                  <PhoneIcon />
                  {hello.phone}
                </div>
              ) : (
                <div className="hidden"></div>
              )}

              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                }}
              >
                {tokenpara ? (
                  <>
                    {likeElemets.some(
                      (current) => current.location_id === hello.location_id
                    ) ? (
                      <button
                        className="flex items-center text-white bg-newpink cursor-pointer gap-x-2 rounded-md py-2 px-2 font-semibold  transition duration-300 ease-in hover:bg-newpink-300"
                        onClick={gotoCart}
                      >
                        Go to Wishlist
                      </button>
                    ) : (
                      <button
                        className="flex items-center text-white bg-newpink cursor-pointer gap-x-2 rounded-md py-2 px-2 font-semibold  transition duration-300 ease-in hover:bg-newpink-300"
                        onClick={addtocart}
                      >
                        Add Item
                      </button>
                    )}
                  </>
                ) : (
                  <button className="hidden"></button>
                )}
              </div>
            </Typography>
          </Box>
        </CardContent>

        {/* button chaiye card mai action chaiye hota hai toh cardaction lagate hai */}
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(hello.web_url, "_blank")}
          >
            Trip Advisor
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(hello.website, "_blank")}
          >
            Website
          </Button>
        </CardActions>

        {/* jruri hotra likna consistent rheta yh pta hota new tab mai khulega
        By setting the target attribute to '_blank', you explicitly instruct the browser to open the URL in a new tab or window, regardless of the user's default settings. This provides a consistent user experience, ensuring that the URL opens in a separate tab without replacing the current page's content. */}
      </Card>
    </>
  );
};

export default PlaceDetails;
