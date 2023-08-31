import React, { useState } from "react";

import "./style.scss";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";
import VideoPopup from "../../../components/videoPopup/videoPopup";
import Img from "../../../components/LazyLoadimage/img";
import { PlayIcon } from "../Playbtn";


// import Img from "../../../components/lazyLoadImage/Img";

const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="videosSection">
            <ContentWrapper>
                <div className="sectionHeading">
                    <div className="videos">
                        {data?.results?.map((video) => (
                            <div key={video.id} className="videoItem" onClick={() => { setVideoId(video.key); setShow(true); }}>
                                <div className="videoThumnbail">
                                    <Img src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}></Img>
                                    <PlayIcon></PlayIcon>
                                </div>
                            </div>
                        ))}


                    </div>
                </div>
                {!loading ? (
                    <div className="videos">
                        Videos data...
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

export default VideosSection;