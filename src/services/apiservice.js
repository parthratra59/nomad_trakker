// isme sari link mention kr skte hai konsi link pr jana hau 

const BASE_URL= process.env.REACT_APP_BASE_URL

// sare chije idhr hi krunga auth signup login vgrh delete vgrh sb

// AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_API: BASE_URL + "/sendotp",
    SIGNUP_API: BASE_URL + "/signup",
    LOGIN_API: BASE_URL + "/login",
    RESETPASSTOKEN_API: BASE_URL + "/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/reset-password",
    CHANGEPASSWORD_API: BASE_URL + "/changepassword/:_id",
  }



  // SETTINGS PAGE API
export const settingsEndpoints = {
  
    DELETE_PROFILE_API: BASE_URL + "/delete-account/:_id",
  }
  
