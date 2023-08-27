import { useEffect, useState } from 'react';
import './style.scss'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFeatch';
import { useSelector } from 'react-redux';
import Img from '../../LazyLoadimage/img';
import ContentWrapper from '../../ContentWrapper/ContentWrapper';

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const naviget = useNavigate()
    const { url } = useSelector((state) => state.home)
    const { data, loading } = useFetch("/movie/upcoming")

    useEffect(() => {
        const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg);
    }, [data])

    const searchQueryHandler = event => {
        if (event.key === "Enter" && query.length > 0) {
            naviget(`/search/${query}`);
        }
    }
    return (
        <div>
            <div className="heroBanner">
                {!loading && <div className="backdrop-img">
                    <Img src={background} />
                </div>}

                <div className="opacity-layer"></div>
                <ContentWrapper>
                    <div className="wrapper">
                        <div className="heroBannerContent">
                            <span className="title">Welcome</span>
                            <span className="subTitle">Millions of movies, TV shows and people to discover. Explore now.</span>
                            <div className="searchInput">
                                <input
                                    type="text"
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyUp={searchQueryHandler}
                                    placeholder='Search for movie or tv show...' />
                                <button>Search</button>
                            </div>
                        </div>
                    </div>
                </ContentWrapper>
            </div>
        </div>
    );
};

export default HeroBanner;