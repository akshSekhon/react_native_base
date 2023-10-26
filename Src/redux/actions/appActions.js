import { clearUserData, setUserData } from '../../Services/AsyncStorage';
import { isAppLoading } from '../reducers/appReducerData';
import store from '../store';

const {dispatch} = store;

export function setIsApploading(data) {
  dispatch(isAppLoading(data));
};


