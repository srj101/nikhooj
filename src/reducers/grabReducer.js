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

export const grabReducer = (state = { grabs: [] }, action) => {
  switch (action.type) {
    case ALL_GRAB_REQUEST:
      return {
        loading: true,
        grabs: [],
      };

    case ALL_GRAB_SUCCESS:
      return {
        loading: false,
        grabs: action.payload.grabs,
        grabsCount: action.payload.grabsCount,
        resultPerPage: action.payload.resultPerPage,
        filteredGrabsCount: action.payload.filteredGrabsCount,
        page: action.payload.page,
        loaded: action.payload.loaded,
      };

    case ALL_GRAB_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const singleGrabReducer = (state = { grab: {} }, action) => {
  switch (action.type) {
    case SINGLE_GRAB_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case SINGLE_GRAB_SUCCESS:
      return {
        loading: false,
        grab: action.payload,
      };

    case SINGLE_GRAB_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const likeGrabReducer = (state = {}, action) => {
  switch (action.type) {
    case LIKE_REQUEST:
    case REPORT_GRAB_REQUEST:
    case CLAIM_GRAB_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case LIKE_SUCCESS:
    case REPORT_GRAB_SUCCESS:
    case CLAIM_GRAB_SUCCESS:
      return {
        loading: false,
      };
    case LIKE_FAIL:
    case REPORT_GRAB_FAIL:
    case CLAIM_GRAB_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const postGrabReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_GRAB_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case POST_GRAB_SUCCESS:
      return {
        loading: false,
        grab: action.payload,
      };
    case POST_GRAB_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
