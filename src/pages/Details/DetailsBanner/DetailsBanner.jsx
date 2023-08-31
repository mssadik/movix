
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


const DetailsBanner = ({ video, crew }) => {

    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`)


    const { url } = useSelector((state) => state.home)

    const _genres = data?.genres?.map((g) => g.id);

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
                                            {data.poster_path ? <Img className="posterImg" src={url.backdrop + data.poster_path}></Img> :  <Img className="posterImg" src={PosterFallback}></Img>  }
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
                                                    <span onClick={() => { }} className="text">Watch Trailer</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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