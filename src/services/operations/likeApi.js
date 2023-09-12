import { toast } from "react-hot-toast";

import { useDispatch } from "react-redux";
import { add, remove } from "../../redux/slices/Likeslice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { setUser } from "../../redux/slices/Profileslice";
import { apiConnector } from "../apiconnector";
import { cartEndpoints } from "../apiservice";

// there are two ways fetch and axios to make api calls CRUD operations ke liye
// fetch is a browser api and axios is a library
// fetch is a promise based api and axios is a promise based library
// dono mai difference yh hai ki axios mai hme .then .catch nhi likhna pdta hai likh bhi skte hai but nhi likhna pdta hai
// dono mai async and await use kr te hai jb ap async and await use krte hai toh apko .then .catch nhi likhna pdta hai

// https://chat.openai.com/share/3658bbeb-0929-449f-8981-617a72165b9e best hai yh isko ek baar ache se sb pdna akri mai jana udhr jyada clear hai

const { ADD_TO_CART_API, REMOVE_FROM_CART_API, SHOW_ALL_CART_ITEMS_API } =
  cartEndpoints;

export const addTocartdb = async (hello, tokenpara) => {
  console.log("tokenpara", tokenpara);

  const toastId = toast.loading("Loading...");

  try {
    // /image append hokar hota hai formdata mai
    // formdata postman mai use krte na photos ke liye isliye use hota
    // Create a parent FormData object

    // Create a child FormData object for the image

    // Yes, you are correct. If your FormData is intended to contain files and images, then you should convert the fetched image data into a Blob before appending it to the FormData object.

    // The Blob format is appropriate for representing binary data like images within the FormData object. When you fetch an image from a URL, it typically comes in a response object, and converting it to a Blob ensures that you have the proper binary representation of the image for inclusion in the FormData.

    // So, your approach of converting the fetched image data into a Blob is the correct way to handle images within a FormData object when you want to send files and images to the server.

    // what is blob in javascript
    // In summary, binary (0 and 1) data is used extensively in file uploads because it is the native format for representing all types of data on computers. When you upload a file, you are essentially transferring its binary content, ensuring that the file's integrity and structure are preserved. This binary representation allows for efficient, interoperable, and secure file handling in a wide range of applications.
    // Interoperability: Binary data is a universal format that can be processed by all types of computers and devices, regardless of their architecture or operating system. This makes it ideal for transmitting files between different systems and platforms.

    // phele hmne fetch kiya maine dekha ki yh file nhi derha hai phele maine fetch kiya async await se then blob mai convert liya maine typeof (hello.photo.images.large.url) kiya tha toh string aya tha toh maine blob mai convert kiya then blob mai convert krne ke baad maine console.log kiya toh blob aya tha toh maine usko append kiya formdata mai If you do not convert the data from a URL to a Blob or another suitable binary format, you won't be able to upload it directly using the Fetch API or other methods designed to upload binary data.

    // When you want to upload a file or binary data to a server, you typically need to provide the data in a format that the server can process, such as a Blob or a Buffer (in Node.js). URLs, on the other hand, point to the location of the resource (e.g., an image) but do not represent the raw binary data of the resource.

    // Therefore, you must convert the data from a URL to a binary format (e.g., a Blob) before you can upload it to a server or perform any other operations that require the binary data itself. The conversion process involves fetching the data from the URL and then transforming it into a suitable binary format, which can then be used for various purposes, including uploading, processing, or displaying the content.

    const formData = new FormData();
    console.log(
      "hello.photo.images.large.url",
      typeof hello.photo.images.large.url
    );
    const res = await fetch(hello.photo.images.large.url);
    const imageBlob = await res.blob();
    formData.append("clicks", imageBlob);
    console.log("typeofimageBlob", typeof imageBlob);

    // Append the image FormData as a part of the parent FormData

    // Append other JSON data as fields in the parent FormData
    formData.append("itemId", hello.location_id || "");
    formData.append("itemName", hello.name);
    formData.append("websiteUrl", hello.website || "");
    formData.append("tripAdviserUrl", hello.web_url || "");
    formData.append("location", hello.address || " ");
    formData.append(
      "ranking",
      hello.ranking ? hello.ranking.replace(/#/g, "") : ""
    );
    formData.append("rating", hello.rating || "");
    formData.append("contactNumber", hello.phone || "");

    const cuisines = hello.cuisine
      ? hello.cuisine.map((item) => item.name).join(", ")
      : "";
    formData.append("cuisine", cuisines);

    formData.append("reviews", hello.num_reviews || "");

    const response = await apiConnector("POST", ADD_TO_CART_API, formData, {
      Authorisation: `Bearer ${tokenpara}`,
    });
    console.log("ktyabaa", response.data);
    console.log("SENDING_DATA_TO_CART API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Item added to cart");
  } catch (error) {
    console.log(error);
    console.log("SENDING_DATA_TO_CART............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
};

// fetching the data by GET request

export const fetchCartData = async (tokenpara) => {
  const result = [];

  try {
    const response = await apiConnector("GET", SHOW_ALL_CART_ITEMS_API, null, {
      Authorisation: `Bearer ${tokenpara}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    console.log("response.data.data", response.data.data);
    // PURA DATA CHAIYE NA ISLIYE SPREAD OPERATOR LGA RHE HAI
    result.push(...response.data.data);
    console.log("result", result);
    return result;
  } catch (error) {
    console.log("COURSE_CATEGORY_API API ERROR............", error);
    toast.error(error.response.data.message);
  }
};



export const deleteItem= async (tokenpara,_id) => {
  try{
      const response = await apiConnector("DELETE", REMOVE_FROM_CART_API, {_id}, {
        Authorisation: `Bearer ${tokenpara}`,
      });
      console.log("response.data.data", response.data.data);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Item deleted from cart");

  }
  catch(error)
  {
    console.error('Error fetching cart data:', error);
    toast.error(error.response.data.message);
  }
}


