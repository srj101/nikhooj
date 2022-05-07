import React, { useCallback, useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getSingleGrab } from '../../../actions/grabActions';
import {Container, Row, Col} from 'react-bootstrap';
import {timeSince} from "./countPostTime"
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import Loading from '../../Loading/Loading';

const center = {
    lat: 23.8803099,
    lng: 90.3145254
  };

const SingleGrabPage = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBH-qpyOlM0fybAR9F8jbnqrAvPSxXH2xA"
    })
    const [map, setMap] = useState(null)

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    const dispatch = useDispatch();
    const alert = useAlert();
    const {grab,loading,error} = useSelector((state) =>  state.singleGrab);
    const {id} = useParams()
    useEffect(()=> {
        if(error) {
            alert.error(error);
        }
        dispatch(getSingleGrab(id))
    },[dispatch,alert])

    
    const {name,_id,long,lat,images,questions,address,description,category,updatedAt} = grab;
    const [time, setTime] = useState(Date.now());
    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 1000);
        return () => {
          clearInterval(interval);
        };
      }, []);
    const containerStyle = {
        width: '100%',
        height: '400px'
      };
    return (
        <>
            {loading ? (<Loading/>): (
                <div className='SingleGrabPage_container'>
                    <div className='images'>
                    </div>
                    <div className='info_container'>
                        <div className='title'>
                            {name}
                        </div>
                        <div className='map'>
                            {/** wah keya seen hae */}
                        
                                
                             
                        </div>
                        <div className="postedTime">
                           
                            Posted {timeSince(new Date(updatedAt))} Ago
                        </div>
                        <div className='category'>
                            {category}
                        </div>
                        <div className='description'>
                            Product Description
                        </div>
                        <div className='where_I_got_location'>
                            Product Location
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default SingleGrabPage