import axios from "axios";
import {
    ALL_GRAB_REQUEST,
    ALL_GRAB_SUCCESS,
    ALL_GRAB_FAIL,
    SINGLE_GRAB_REQUEST,
    SINGLE_GRAB_SUCCESS,
    SINGLE_GRAB_FAIL
} from "../constants/grabConstants"

export const getAllGrabs = (keyword = "", currentPage = 1, category = "") => async (dispatch, getState) => {
    try {
        dispatch({ type: ALL_GRAB_REQUEST })
        const { data } = await axios.get(`http://localhost:4000/api/v1/grabs/?page=${currentPage}&keyword=${keyword}&category=${category}`);

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
}



export const getSingleGrab = (id) => async (dispatch) => { 
    try {
        dispatch({type:SINGLE_GRAB_REQUEST});
        const {data} = await axios.get(`http://localhost:4000/api/v1/grabs/${id}`);
        dispatch({type: SINGLE_GRAB_SUCCESS, payload:data.grab});

    } catch (error) {
        dispatch({type:SINGLE_GRAB_FAIL,payload:error.response.data.message});
    }
}
