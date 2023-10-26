//import liraries
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { Provider, } from 'react-redux';
import RootScreen from './Src/NavigationStacks/RootScreen';
// import { store } from './Src/Redux/Store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getItem, getUserData } from './Src/Services/AsyncStorage';
import { notificationListener, requestUserPermission } from './Src/Services/notificationServices';
import actions from './Src/redux/actions';
import { saveFcmTokenToRedux } from './Src/redux/actions/auth';
import store from './Src/redux/store';
// create a component
const App = () => {
  useEffect(() => {
    if (!__DEV__) {
      console.log = () => { };
    }
    _saveUserData();
  }, []);
  const _saveUserData = async () => {
    await getUserData().then((res) => {
      console.log('user loacal data : -=--- ', res);
      actions.saveUserDataToReux(res);
    });
  };
  useEffect(() => {
    requestUserPermission();
    notificationListener();
  }, []);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    getItem('FCM_TOKEN').then(cb => {
      console.log(cb, 'FCM_TOKEN getItem');
      if (cb != null) {
        saveFcmTokenToRedux(cb);
        setLoading(false)
      }
    }).catch((err) => {
      console.log('fcm getting error : ---', err);
      setLoading(false)
    });

    registerAppWithFCM();
  }, []);

  async function registerAppWithFCM() {
    await messaging().registerDeviceForRemoteMessages();
  }


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>

        {!loading &&
          <RootScreen />
        }
        <FlashMessage position="top" />
      </Provider>
    </GestureHandlerRootView>

  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },

});

//make this component available to the app
export default App;
