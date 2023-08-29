import React, { useState } from 'react';
import ContentWrapper from '../../../components/ContentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/SwitchTabs/SwitchTabs';
import './style.scss'
import useFetch from '../../../hooks/useFeatch';

const Trending = () => {
    const [endpoint, setEndpoint] = useState("day");
    const {data, loading} = useFetch(`/trending/all/${endpoint}`)

    const onTabChange = tab =>{
        setEndpoint(tab === "Day" ? "day" : "week")
    }
    return (
        <div className='carouselSection'>
            <ContentWrapper>
                <span className='carouselTitle'>Trending</span>
                <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange}></SwitchTabs>
            </ContentWrapper>
        </div>
    );
};

export default Trending;