import {
    ALL_GRAB_REQUEST,
    ALL_GRAB_SUCCESS,
    ALL_GRAB_FAIL,
    SINGLE_GRAB_REQUEST,
    SINGLE_GRAB_SUCCESS,
    SINGLE_GRAB_FAIL,
    LIKE_REQUEST,
    LIKE_SUCCESS,
    LIKE_FAIL
} from "../constants/grabConstants"

export const grabReducer = (
    state = { grabs: [] },
    action
  ) => {
      switch(action.type) {
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
                resultPerPage:action.payload.resultPerPage,
                filteredGrabsCount:action.payload.filteredGrabsCount,
                page:action.payload.page,
                loaded:action.payload.loaded
              };

        case ALL_GRAB_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state;
      }
  }






  export const singleGrabReducer = (state = { grab: {} }, action) => {
    switch (action.type) {
      case SINGLE_GRAB_REQUEST:
        case LIKE_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case SINGLE_GRAB_SUCCESS:
        return {
          loading: false,
          grab: action.payload,
        };
      
      case LIKE_SUCCESS:
        return {
          loading:false,
          hearted: action.payload.hearted,
        }
      case SINGLE_GRAB_FAIL:
        case LIKE_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };