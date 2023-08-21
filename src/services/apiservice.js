// isme sari link mention kr skte hai konsi link pr jana hau 

const BASE_URL= process.env.REACT_APP_BASE_URL

// sare chije idhr hi krunga auth signup login vgrh delete vgrh sb

// AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendOTP",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/resetpasswordtoken",
    RESETPASSWORD_API: BASE_URL + "/auth/resetpassword",
    CHANGEPASSWORD_API: BASE_URL + "/auth/changepassword/:_id",
  }



  // SETTINGS PAGE API
export const settingsEndpoints = {
  
    DELETE_PROFILE_API: BASE_URL + "/delete-account/:_id",
  }
  
