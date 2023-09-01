import { useEffect, useState } from 'react';
import './style.scss'
import { useParams } from 'react-router-dom';
import { fetchDataFromApi } from './../../utils/api';
import Spinner from '../../components/Spinner/Spinner';
import ContentWrapper from './../../components/ContentWrapper/ContentWrapper';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieCard from '../../components/MOvieCard/MOvieCard';

const SearchResult = () => {
    const [data, setData] = useState(null)
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const { query } = useParams();

    const fetchInitialData = () =>{
        setLoading(true);
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
        .then((res) =>{
            setData(res);
            setPageNum((prev) => prev + 1);
            setLoading(false);
        })
    }

    const fetchNextPageData = () =>{
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
        .then((res) =>{
            if(data?.results) {
                setData({
                    ...data, results: [...data?.results, ...res.results]
                })
            }else{
                setData(res);
            }
            setPageNum((prev) => prev + 1);
        })
    } 

    useEffect(() =>{
        fetchInitialData(1);
    }, [query])

    return (
        <div className='searchResultsPage'>
            {loading && <Spinner initial={true}></Spinner>}
            {!loading && 
                <ContentWrapper>
                    {data?.results?.length > 0 ? <div>
                        <div className="pageTitle">
                            {`Search ${data?.total_results > 1 ? "results" : "result"} of '${query}'`}
                        </div>
                        <InfiniteScroll className='content' dataLength={data?.results.length || []} next={fetchNextPageData} hasMore={pageNum <=data?.total_pages} loader={<Spinner></Spinner>}>
                            {data?.results.map((item, index) =>{
                                if(item.media_type === "person") return;
                                return(
                                    <MovieCard key={index} data={item} fromSearch={true}></MovieCard>
                                )
                            })}
                        </InfiniteScroll>
                    </div> : 
                    <span className='resultNotFound'>Result Not Found</span>}
                </ContentWrapper>
            }
        </div>
    );
};

export default SearchResult;