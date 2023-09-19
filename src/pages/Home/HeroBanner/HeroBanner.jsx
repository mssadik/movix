import { useEffect, useRef, useState } from 'react';
import './style.scss'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFeatch';
import { useSelector } from 'react-redux';
import ContentWrapper from '../../../components/ContentWrapper/ContentWrapper';
import Swal from 'sweetalert2';
import Img from '../../../components/LazyLoadimage/img';

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const naviget = useNavigate()
    const { url } = useSelector((state) => state.home)
    const { data, loading } = useFetch("/movie/upcoming")
    const input = useRef();
    const {email} = useSelector((state) => state.user)
    

    useEffect(() => {
        const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg);
    }, [data])

    const searchQueryHandler = event => {
        if (event.key === "Enter" && query.length > 0) {
            naviget(`/search/${query}`);
        }
    }

    const handelSearchQuery = (query) =>{
        
        if(!email){
            Swal.fire({
                title: 'Login first plases',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login'
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    naviget('/SignUp')
                  )
                }
              })

            }else if(email){
                naviget(`/search/${query}`);
            }
            if(query.length !== 0){

                naviget(`/search/${query}`);
            }
            return;
        
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
                                    required={true}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyUp={searchQueryHandler}
                                    ref={input}
                                    placeholder='Search for movie or tv show...' />
                                <button onClick={() => handelSearchQuery(input.current?.value)}>Search</button>
                            </div>
                        </div>
                    </div>
                </ContentWrapper>
            </div>
        </div>
    );
};

export default HeroBanner;