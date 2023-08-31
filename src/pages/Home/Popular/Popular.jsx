


import React, { useState } from 'react';
import SwitchTabs from '../../../components/SwitchTabs/SwitchTabs';
// import './style.scss'
import useFetch from '../../../hooks/useFeatch';
import Carousel from '../../../components/Carousel/Carousel';
import ContentWrapper from '../../../components/ContentWrapper/ContentWrapper';

const Popular = () => {
    const [endpoint, setEndpoint] = useState("movie");
    const {data, loading} = useFetch(`/${endpoint}/popular`)

    const onTabChange = tab =>{
        setEndpoint(tab === "Movies" ? "movie" : "tv")
    }
    return (
        <div className='carouselSection'>
            <ContentWrapper>
                <span className='carouselTitle'>What's Popular</span>
                <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange}></SwitchTabs>
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endpoint={endpoint}></Carousel>
        </div>
    );
};

export default Popular;