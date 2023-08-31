
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";
import useFetch from './../../../hooks/useFeatch';
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";
import Img from "../../../components/LazyLoadimage/img";
import '../../../assets/no-poster.png'
import Genres from "../../../components/Genres/Genres";
import CircleRating from "../../../components/CircleRating/CircleRating";
import { PlayIcon } from "../Playbtn";
import VideoPopup from "../../../components/videoPopup/videoPopup";


const DetailsBanner = ({ video, crew }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`)


    const { url } = useSelector((state) => state.home)

    const _genres = data?.genres?.map((g) => g.id);

    const director = crew?.filter((f) => f.job === "Director");
    console.log(director);
    const writer = crew?.filter((f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer")

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    return (
        <div className="detailsBanner">
            {!loading ? (
                <div >
                    <>
                        {!!data && (
                            <React.Fragment>
                                <div className="backdrop-img">
                                    <Img src={url.backdrop + data.backdrop_path}></Img>
                                </div>
                                <div className="opacity-layer"></div>
                                <ContentWrapper>
                                    <div className="content">
                                        <div className="left">
                                            {data.poster_path ? <Img className="posterImg" src={url.backdrop + data.poster_path}></Img> : <Img className="posterImg" src={PosterFallback}></Img>}
                                        </div>
                                        <div className="right">
                                            <div className="title">
                                                {`${data?.name || data?.title} ${dayjs(data.release_date).format("YYYY")}`}
                                            </div>
                                            <div className="subtitle">
                                                {data?.tagline}
                                            </div>
                                            <Genres data={_genres}></Genres>
                                            <div className="row">
                                                <CircleRating rating={data.vote_average.toFixed(1)}></CircleRating>
                                                <div className="playbtn">
                                                    <PlayIcon></PlayIcon>
                                                    <span onClick={() => { setShow(true); setVideoId(video.key); }} className="text">Watch Trailer</span>
                                                </div>
                                            </div>
                                            <div className="overview">
                                                <div className="heading">Overview</div>
                                                <div className="description">{data?.overview}</div>
                                            </div>
                                            <div className="info">
                                                {data.status &&
                                                    <div className="infoItem">
                                                        <span className="text bold">Status: {" "}</span>
                                                        <span className="text">{data.status}</span>
                                                    </div>
                                                }
                                                {data.release_date &&
                                                    <div className="infoItem">
                                                        <span className="text bold">Release Date: {" "}</span>
                                                        <span className="text">{dayjs(data.release_date).format("MMM D, YYYY")}</span>
                                                    </div>
                                                }
                                                {data.runtime &&
                                                    <div className="infoItem">
                                                        <span className="text bold">Length: {" "}</span>
                                                        <span className="text">{toHoursAndMinutes(data.runtime)}</span>
                                                    </div>
                                                }
                                            </div>
                                            {director && director.length > 0 &&
                                                <div className="info">
                                                    <span className="text bold">Director: {" "}</span>
                                                    {director.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name} 
                                                            {i !== director.length - 1 && ", "} 
                                                        </span>
                                                    ))}
                                                </div>
                                            }
                                            {writer && writer.length > 0 &&
                                                <div className="info">
                                                    <span className="text bold">Writer: {" "}</span>
                                                    {writer.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name} 
                                                            {i !== director.length - 1 && ", "} 
                                                        </span>
                                                    ))}
                                                </div>
                                            }
                                            { data?.created_by?.length > 0 &&
                                                <div className="info">
                                                    <span className="text bold">Creator: {" "}</span>
                                                    {data?.created_by.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name} 
                                                            {i !== data?.created_by.length - 1 && ", "} 
                                                        </span>
                                                    ))}
                                                </div>
                                            }






                                        </div>
                                    </div>
                                    <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId}></VideoPopup>
                                </ContentWrapper>
                            </React.Fragment>
                        )}
                    </>
                </div>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;