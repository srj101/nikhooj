import React from 'react'
import Slider from "react-slick";
import { Col } from 'react-bootstrap';
import "./Grab.css"
import { FiShare } from 'react-icons/fi';
import {GiHearts} from 'react-icons/gi'
import {VscComment} from 'react-icons/vsc';
import {FaHandSparkles} from 'react-icons/fa';
const Grab = ({grab}) => {
    const {images,name,category,subCat,des,ques,address,long,lat,hearts,reportCount,tags,trash,postDate} = grab;
    const settings = {
        dots:false,
        dotsClass:'grab-dots',
      
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
  return (
    <Col xs={12} sm={12} md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }} className='Grab'>
        <div className="grab__header">
            <div className="userInfo">
                <div className="userProfileDP">
                    <img src="https://www.w3schools.com/howto/img_avatar.png" alt="" />
                </div>
                <div className="postedBy">
                    <h4>Nikhooj Admin</h4>
                </div>
            </div>
            <div className="grabMenu">
                <p>...</p>
            </div>
        </div>
        <div className='grabImages'>
            <Slider>
                {images.map((grabImage,i) => (
                    <div className='grabImage'>
                        <img key={i} src={grabImage.url}/>
                    </div>
                ))}
            </Slider>
        </div>
        <div className='grab_navs__container'>
            <div className="nav_icons">
                <div className='grabHearts'>
                    <GiHearts/>
                </div>
                <div className='grabComments'>
                    <VscComment/>
                </div>
                <div className='grabShare'>
                    <FiShare/>
                </div>
            </div>
            <div className="claimGrab">
                <FaHandSparkles/>
            </div>
        </div>
        
    </Col>
  )
}

export default Grab