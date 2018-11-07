import axios from 'axios';

import { LOGIN, REGISTER } from './constants';
import * as types from './types';

export const login = e => {
  return (dispatch, getState) => {
    e.preventDefault();
    window.location.replace(LOGIN);
  };
};

export const logout = () => {
  return (dispatch, getState) => {
    dispatch({
      type: types.LOGOUT
    });
  };
};

export const register = code => {
  return (dispatch, getState) => {
    const headers = { 'Content-Type': 'application/json' };
    const body = {
      headers,
      code
    };

    return axios.post(REGISTER, body).then(res => {
      console.log(res.data);
      if (res.status === 200) {
        dispatch({ type: types.LOGIN_SUCCESSFUL, data: res.data });
        return res.data;
      }

      dispatch({ type: types.LOGIN_FAILED, data: res.data });
      throw res.data;
    });
  };
};

// edit this function
// given a token (which will be in local storage/redux state)
// return a username
export const fetchUser = token => {
  return (dispatch, getState) => {
    const headers = { 'Content-Type': 'application/json' };
    const body = {
      headers,
      code
    };

    return axios.post(REGISTER, body).then(res => {
      console.log(res.data);
      if (res.status === 200) {
        dispatch({ type: types.LOGIN_SUCCESSFUL, data: res.data });
        return res.data;
      }

      dispatch({ type: types.LOGIN_FAILED, data: res.data });
      throw res.data;
    });
  };
};
