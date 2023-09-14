import axios from "axios";

export const axiosInstance = axios.create({});
// yh ek generic methos hai axios ki uske baad ab aap ko baar baar new code likhna  nhi hai get,post delete put ka

// yh axios ka instance hai

// Yes, in the example you provided for the apiConnector function, there are five parameters:

// method: Specifies the HTTP method for the request.
// url: Specifies the URL of the API endpoint.
// bodyData: Represents the data to be sent in the request body.
// headers: Optional parameter to specify custom headers for the request.
// params: Optional parameter to specify query parameters for the request.
// So, in the context of the apiConnector function you provided, there are a total of five parameters that allow you to customize and configure your API requests.

// imaportant jb bbhi ap backend se connect kr rhe ho toh yh use krna hai yh ek generic method hai
// means header params and bodydata use krna hi pdega toh yh use krna hai

export const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};
