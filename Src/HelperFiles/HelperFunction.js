import { Clipboard, Platform } from "react-native";
import { showMessage } from "react-native-flash-message";
import { AlertType, Position } from "../Constants/Enums";
import NavigationService from "../Services/NavigationService";

// export const showAlertMessageWithProps = ({message, alertType = danger,position = 'top',discription}) => {
//     {
//       (message) &&
//         showMessage({
//           type: alertType,
//           icon: alertType,
//           message: message,
//           floating: true,
//           position:position,
//           description:discription
//         });
//     }
//   }
//   export const showAlertMessage = (message, alertType = danger,position = 'top',discription) => {
//     {
//       (message) &&
//         showMessage({
//           type: alertType,
//           icon: alertType,
//           message: message,
//           floating: true,
//           position:position,
//           description:discription
//         });
//     }
//   }


export function showAlertMessage(message, alertType = AlertType.danger,position = Position.top) {
    {
      (message) &&
        showMessage({
          type: alertType,
          icon: alertType,
          message: message,
          floating: true,
          position:position
        });
    }
  }
  export const delayed = (delayInms = 3000) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
  };


  export const copyText = async (text) => {
    Clipboard.setString(text);
    if (text  && Platform.OS === 'ios') {
        showAlertMessageWithProps({message:`Copy to Clipboard\n \n ${text}`,alertType:AlertType.none,position:Position.bottom})
    }
    
  };
  export const print = (message) => {
    return (
      console.log(message)
    )
  };
export const pushTo = (screenName, data) => {
  return (
  NavigationService.navigate(screenName, data)
  )
}

export const goBack = ()=>{
  return (
  NavigationService.goBack()
  )
}

export function securedEmailText(email) {
  // const email = "akshpreet@yopmail.com";
  
  // Split the email into username and domain parts
  const [username, domain] = email.split('@');
  
  // Ensure the username and domain have enough characters for hiding
  const hiddenUsername = username.length > 3 ? username.substring(0, 2) + '*'.repeat(username.length - 2) : username;
  const hiddenDomain = domain.length >= 3 ? domain.substring(0, 2) + '*'.repeat(domain.length - 2) : domain;
  
  // Reassemble the email with hidden parts
  const hiddenEmail = `${hiddenUsername}@${hiddenDomain.substring(0, 6)}`;
  return hiddenEmail

}