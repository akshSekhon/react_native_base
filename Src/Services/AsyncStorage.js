import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getHeaders() {
    let userData = await AsyncStorage.getItem("userData");
    if (userData != null) {
      userData = JSON.parse(userData);
      return {
        Authorization: `${userData?.token}`,
      };
    }
    return {};
  }
  export async function setUserData(data) {
    data = JSON.stringify(data);
    return AsyncStorage.setItem("userData", data);
  }
  export async function setFcmToken(data) {
    data = JSON.stringify(data);
    return AsyncStorage.setItem("FcmToken", data);
  }
  export async function setItem(key, data) {
    data = JSON.stringify(data);
    return AsyncStorage.setItem(key, data);
  }
  export async function getItem(key) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(key).then((data) => {
        resolve(JSON.parse(data));
      });
    });
  }
  export async function removeItem(key) {
    return AsyncStorage.removeItem(key);
  }
  export async function clearAsyncStorate(key) {
    return AsyncStorage.clear();
  }
  export async function getUserData() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem("userData").then((data) => {
        resolve(JSON.parse(data));
      });
    });
  }
  export async function getFcmToken() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem("FcmToken").then((data) => {
        resolve(JSON.parse(data));
      });
    });
  }
  export async function clearUserData() {
    return AsyncStorage.removeItem("userData");
  }
  
 