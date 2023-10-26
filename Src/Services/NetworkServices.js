
import axios from "axios";
// import { showAlertMessage } from "../HelperFiles/helperFunction";

import { getHeaders } from "./AsyncStorage";
import actions from "../redux/actions";
import { showAlertMessage } from "../HelperFiles/HelperFunction";
const onUploadProgress = (progressEvent) => {
  const { loaded, total } = progressEvent;
  let percent = Math.floor((loaded * 100) / total);
  if (percent < 100) {
    console.log(`${loaded} bytes of ${total} bytes. ${percent}%`);
  }
};
export async function apiReq(
  endPoint,
  data,
  method,
  headers = {},
  requestOptions = {},
  // timeout = 10000
) {
  actions.setIsApploading(true)
  return new Promise(async (res, rej) => {
    const getTokenHeader = await getHeaders();
    console.log(getTokenHeader, "getTokenHeader")
    console.log(endPoint, "endPoint");
    console.log(method, "method");
    headers = {
      ...getTokenHeader,
      ...headers,
    };
    if (method === "get" || method === "delete") {
      data = {
        ...requestOptions,
        ...data,
        headers,

      };
    }
    // console.log("check param generator>>>", data);
    console.log("Api Input Data :>>>>>>>>>>>>>>>>>>>>>> \n",
      " Api End Point :<<<<<<<<  ", endPoint, "  >>>>>>>>>\n",
      "\nParams are : <<<<<<<< ", data, " >>>>>>>>>>>>\n",
      " header is : <<<<<<<< ", headers, "   >>>>>>>>", "\n", '\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>'
    );
    //

    axios[method](endPoint, data, { headers })
      // axios[method](endPoint, {data,headers: {headers}, onUploadProgress})
      .then((result) => {
        console.log("POST RESPONSE: " + JSON.stringify(result));
        // console.log("api jacon respons is ",result.JSON)
        console.log(endPoint, 'Api Respons is : <<<<<<<<<<<<<<<<<<<  \n', JSON.stringify(result), '\n >>>>>>>>>>>>>>>>');

        const { data } = result;
        if (data.error) {

        }
        if (data.message) {

        }
        if (data.status == 401) {
          const messg = data?.message != "" ? data?.message : data?.error

          console.log("message from status 401 is : -----", messg)
          // showAlertMessage(messg)
          // actions.clearDefaultStorage({})
        }
        if (data.status === false) {
          actions.setIsApploading(false)
          return rej(data);
        }
        console.log(data, "Api rspons from main is");
        actions.setIsApploading(false)
        return res(data);
      })

      .catch((error) => {
        console.log(endPoint, 'Api Error is : <<<<<<<<<<<<<<<<<<<  \n', JSON.stringify(error), '\n >>>>>>>>>>>>>>>>');


        if (error.response.data.status == 401) {
          showAlertMessage(error?.response?.data?.message)
          actions.clearLoginData({})
        }

        // actions.setIsApploading(false)
        // const message = handleApiError(error)
        // console.log('handleApiError handleApiError message : ---',message);
        // showAlertMessage(`${message}`)
       
        // return rej(error);

        if (error?.code === 'ECONNABORTED') {
          console.log('Request timed out');
          showAlertMessage(`Request timed out. Please try again after some`)
          actions.setIsApploading(false)
          return rej(error);
        }
        // if (error?.code === 'ERR_BAD_REQUEST'){
        //   console.log('Internal server error .');
        //   showAlertMessage(`Internal server error . Please try again after some`)
        //   actions.setIsApploading(false)
        //   return rej(error);
        // }

        if (error.response) {
          const data = error?.response?.data
          const messg = data?.message != "" ? data?.message : data?.error
          showAlertMessage(messg)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error message : --- ', error.message);
        }
        if (error && error.response && error.response.status === 401) {
          actions.setIsApploading(false)
          return rej(error);
        }
        if (error && error.response && error.response.data) {
          if (!error.response.data.error) {
            actions.setIsApploading(false)
            return rej({
              ...error.response.data,
              error: error.response.data.error || "Network Error",
            });
          }
          actions.setIsApploading(false)
          return rej(error.response.data);
        } else {
          actions.setIsApploading(false)
          return rej({ error: "Network Error", message: "Network Error" });
        }
        return rej(error);
      });
  });
}
const handleApiError = (error) => {
     if (error?.code === 'ECONNABORTED') {
          return `Request timed out. Please try again after some`
        }
        if (error?.code === 'ERR_BAD_REQUEST'){
          return`Internal server error . Please try again after some`
        }

        if (error.response) {
          const data = error?.response?.data
          const messg = data?.message != "" ? data?.message : data?.error
          actions.setIsApploading(false)
          return messg
        } 
        if (error && error.response && error.response.status === 401) {
          actions.setIsApploading(false)
          return`Unautorised request`
          // return rej(error);
        }
        if (error && error.response && error.response.data) {
            return`fail due to bad request `
        } else {
          return 'Networ error'
        }

  // if (error?.response) {
  //   const { status, data } = error?.response;
  //   if (status === 404) {
  //     return `Resource not found: ${data?.message}`;
  //   } else if (status === 500) {
  //     return `Internal Server Error: ${data?.message}`;
  //   } else {
  //     return `An error occurred: ${data?.message}`;
  //   }
  // } else if (error?.request) {
  //   return `Network Error: ${error?.message}`;
  // } else {
  //   return `Request Error: ${error?.message}`;
  // }
};
export async function apiPost(endPoint, data, headers = {}) {
  return apiReq(endPoint, data, "post", headers);
}
export function apiDelete(endPoint, data, headers = {}) {
  return apiReq(endPoint, data, "delete", headers);
}
export function apiGet(endPoint, data, headers = {}, requestOptions) {
  return apiReq(endPoint, data, "get", headers, requestOptions);
}
export function apiPut(endPoint, data, headers = {}) {
  return apiReq(endPoint, data, "put", headers);
}