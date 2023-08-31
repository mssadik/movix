import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import PosterFallback from "../../assets/no-poster.png"

import "./style.scss";
import CircleRating from "../CircleRating/CircleRating";
import Genres from "../Genres/Genres";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import Img from "../LazyLoadimage/img";
const Carousel = ({ data, loading, endpoint, title }) => {
    const carouselContainer = useRef();
    const { url } = useSelector((state) => state.home)
    const naviget = useNavigate();

    const navigation = (dir) => {
        const container = carouselContainer.current;
        const scrollAmount = dir === "left" ? container.scrollLeft - (container.offsetWidth + 20) :
            container.scrollLeft + (container.offsetWidth + 20);
        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        })
    }

    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock ">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        )
    }
    return (
        <div className="carousel">
            <ContentWrapper>
                {
                    title &&
                    <div className="carouselTitle">{title}</div>
                }
                <BsFillArrowLeftCircleFill className="carouselLeftNav arrow" onClick={() => navigation("left")}></BsFillArrowLeftCircleFill>
                <BsFillArrowRightCircleFill className="carouselRightNav arrow" onClick={() => navigation("right")}></BsFillArrowRightCircleFill>
            </ContentWrapper>
            {!loading ?
                <div ref={carouselContainer} className="carouselItems">
                    {data?.map((item) => {
                        const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback
                        return (
                            <div
                                onClick={() => naviget(`/${item.media_type || endpoint}/${item.id}`)}
                                key={item.id}
                                className="carouselItem"

                            >
                                <div className="posterBlock">
                                    <Img src={posterUrl}></Img>
                                    <CircleRating rating={item.vote_average.toFixed(1)}></CircleRating>
                                    <Genres data={item.genre_ids.slice(0, 2)}></Genres>
                                </div>
                                <div className="textBlock">
                                    <span className="title">{item.title || item.name}</span>
                                    <span className="date">{dayjs(item.release_Date).format("MMM D, YYYY")}</span>
                                </div>
                            </div>
                        )
                    })}
                </div> :
                <div className="loadingSkeleton">
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                </div>}
        </div>
    );
};

export default Carousel;