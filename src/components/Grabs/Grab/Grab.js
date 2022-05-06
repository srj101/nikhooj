import React, { useEffect } from 'react'
import "./Grab.css"
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FiShare } from 'react-icons/fi';
import { GiHearts } from 'react-icons/gi'
import { VscComment } from 'react-icons/vsc';
import { FaHandSparkles, FaHandMiddleFinger } from 'react-icons/fa';
import NumberFormat from 'react-number-format';
import { ShareSocial } from 'react-share-social'
import { timeSince } from '../SingleGrabPage/countPostTime';

const Grab = ({ grab }) => {
    const { _id, images, name, category, subCategory, description, questions, address, long, lat, hearts, noOfReports,claims, tags, trash,postedBy, updatedAt } = grab;
    const settings = {
        dots: false,
        dotsClass: 'grab-dots',
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };


    const handleClaimGrab = () => {
        console.log("claim by omuk user")
    }
    const handleHeartClick = () =>
    {
        console.log('heart clicked');
    }

    const handleReportClick = () => {
        console.log("reported")
    }
    
    return (
        <div className='Grab'>
            <div className="grab__header">
                <Link to='/profile' className="userInfo">
                    <div className="userProfileDP">
                        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="" />
                    </div>
                    <div className="postedBy">
                        <h4>{postedBy.name}</h4>
                    </div>
                </Link>
                <div className="grabMenu">
                    <p>...</p>
                </div>
            </div>
            <div className='grabImages'>
                <Swiper>
                    {images.map((grabImage, i) => (
                        <SwiperSlide 
                        EffectCube
                        Zoom
                        Lazy
                        Parallax
                        slidesPerView={1}
                        Mousewheel
                        ><Link to={`/grab/${_id}`} className='grabImage'>
                            <img key={i} src={grabImage.url} />
                        </Link></SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className='grab_navs__container'>
                <div className="nav_icons">
                    <div className='grabHearts'>
                        <GiHearts onClick={handleHeartClick}/>
                    </div>
                    <div className='grabComments'>
                        <Link to={`/grab/${_id}/comments`}><VscComment/></Link>
                    </div>
                    <div className='grabShare'>
                        {/* <ShareSocial
                        url ={`${window.location.href}/grab/${_id}`}
                        socialTypes={['facebook','twitter','reddit','linkedin']}
                        ><FiShare /></ShareSocial> */}
                        <FaHandMiddleFinger onClick={handleReportClick}/>
                    </div>
                </div>
                <div className="claimGrab" onClick={handleClaimGrab}>
                    <span>Claim as Yours!</span>  <FaHandSparkles />
                </div>
            </div>
            <div className="grab__footer">
                <div className="grab_name">{name}</div>
                <div className="postedAgo">Posted {timeSince(new Date(updatedAt))} Ago</div>
                <Link to={`/grab/${_id}`} className="grab_address">{address}</Link>
                <div className="heartCount"><NumberFormat thousandSeparator type='text' displayType='text' value={hearts} /> Hearts &amp; <NumberFormat thousandSeparator type='text' displayType='text' value={noOfReports} /> Reports </div>
                <div className="claimCount">{<NumberFormat thousandSeparator type='text' displayType='text' value={claims} />} Claims</div>
                <div className="commentCount">View all 85 comments</div>
            </div>
        </div>
    )
}

export default Grab