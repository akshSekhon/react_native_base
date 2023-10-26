
const API_BASE_URL = 'https://expressminds-apis.zip2box.com/'
const SOCKET_URL = 'https://expressminds-apis.zip2box.com/'
const API_MIDPT_USER_URL = 'api/user/'
const API_MIDPT_ADMIN_URL = 'api/admin/'
const API_MIDPT_UPLOAD_URL = 'uploads/'

export const IMAGE_URl = API_BASE_URL + API_MIDPT_UPLOAD_URL
const getUserApiUrl = (endpoint) => API_BASE_URL + API_MIDPT_USER_URL + endpoint;
// const getAdminApiUrl = (endpoint) => API_BASE_URL + API_MIDPT_ADMIN_URL + endpoint;

export const Apis ={
    login:getUserApiUrl('login'),
    logOut:getUserApiUrl('logout'),
    signUp:getUserApiUrl('sign-up'),
    forgotPassword:getUserApiUrl('forgotPassword'),
    resendotp:getUserApiUrl('resendotp'),
    verifyOtp_Signup:getUserApiUrl('verifyotp-signup'),
    verifyOtp:getUserApiUrl('verifyOtp'),
    resetPassword:getUserApiUrl('resetPassword'),
    news:getUserApiUrl('news'),
    cryptoNews:getUserApiUrl('cryptoNews'),


}
