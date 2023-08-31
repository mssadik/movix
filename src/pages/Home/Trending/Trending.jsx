import React, { useState } from 'react';
import SwitchTabs from '../../../components/SwitchTabs/SwitchTabs';
import './style.scss'
import useFetch from '../../../hooks/useFeatch';
import Carousel from '../../../components/Carousel/Carousel';
import ContentWrapper from '../../../components/ContentWrapper/ContentWrapper';

const Trending = () => {
    const [endpoint, setEndpoint] = useState("day");
    const {data, loading} = useFetch(`/trending/movie/${endpoint}`)
    // console.log(data && data);

    const onTabChange = tab =>{
        setEndpoint(tab === "Day" ? "day" : "week")
    }
    return (
        <div className='carouselSection'>
            <ContentWrapper>
                <span className='carouselTitle'>Trending</span>
                <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange}></SwitchTabs>
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading}></Carousel>
        </div>
    );
};

export default Trending;