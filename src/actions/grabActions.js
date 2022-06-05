import axios from "axios";
import { BACKEND_URL } from "../constants";
import {
  ALL_GRAB_REQUEST,
  ALL_GRAB_SUCCESS,
  ALL_GRAB_FAIL,
  SINGLE_GRAB_REQUEST,
  SINGLE_GRAB_SUCCESS,
  SINGLE_GRAB_FAIL,
  LIKE_REQUEST,
  LIKE_SUCCESS,
  LIKE_FAIL,
  POST_GRAB_REQUEST,
  POST_GRAB_SUCCESS,
  POST_GRAB_FAIL,
  REPORT_GRAB_REQUEST,
  REPORT_GRAB_SUCCESS,
  REPORT_GRAB_FAIL,
  CLAIM_GRAB_REQUEST,
  CLAIM_GRAB_SUCCESS,
  CLAIM_GRAB_FAIL,
} from "../constants/grabConstants";
axios.defaults.maxBodyLength = "infinity";
axios.defaults.maxContentLength = "infinity";
export const getAllGrabs =
  (keyword = "", currentPage = 1, category = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ALL_GRAB_REQUEST });
      const { data } = await axios.get(
        `${BACKEND_URL}/api/v1/grabs/?page=${currentPage}&keyword=${keyword}&category=${category}`
      );

      dispatch({
        type: ALL_GRAB_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_GRAB_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getSingleGrab = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_GRAB_REQUEST });
    const { data } = await axios.get(`${BACKEND_URL}/api/v1/grabs/${id}`);
    dispatch({ type: SINGLE_GRAB_SUCCESS, payload: data.grab });
  } catch (error) {
    dispatch({ type: SINGLE_GRAB_FAIL, payload: error.response.data.message });
  }
};

export const likeAGrab = (id) => async (dispatch) => {
  try {
    dispatch({ type: LIKE_REQUEST });
    const { data } = await axios.post(
      `${BACKEND_URL}/api/v1/grabs/like?id=${id}`
    );
    dispatch({ type: LIKE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LIKE_FAIL, payload: error.response.data.message });
  }
};

// Report spam, nudity , vulgar etc
export const reportAGrab = (Data) => async (dispatch) => {
  try {
    dispatch({ type: REPORT_GRAB_REQUEST });
    const { data } = await axios.post(`${BACKEND_URL}/api/v1/report/new`, {
      ...Data,
    });
    dispatch({ type: REPORT_GRAB_SUCCESS, payload: data.report });
  } catch (error) {
    dispatch({ type: REPORT_GRAB_FAIL, payload: error.response.data.message });
  }
};

// Claim a grab
export const claimAGrab = (Data) => async (dispatch) => {
  try {
    dispatch({ type: CLAIM_GRAB_REQUEST });
    const { data } = await axios.post(`${BACKEND_URL}/api/v1/claim/new`, {
      ...Data,
    });
    dispatch({ type: CLAIM_GRAB_SUCCESS, payload: data.claim });
  } catch (error) {
    dispatch({ type: CLAIM_GRAB_FAIL, payload: error.response.data.message });
  }
};

export const postSingleGrab = (formData) => async (dispatch) => {
  try {
    dispatch({ type: POST_GRAB_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post(
      `${BACKEND_URL}/api/v1/grabs/new`,
      formData,
      config
    );
    dispatch({ type: POST_GRAB_SUCCESS, payload: data.grab });
  } catch (error) {
    dispatch({ type: POST_GRAB_FAIL, payload: error.response.data.message });
  }
};
