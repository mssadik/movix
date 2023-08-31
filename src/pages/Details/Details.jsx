import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFeatch';
import DetailsBanner from './DetailsBanner/DetailsBanner';
import './style.scss'
import Cast from './Cast/Cast';
import VideosSection from './VideosSection/VideosSection';
import Similar from './Carousels/Similar';
import Recommendation from './Carousels/Recommendation';

const Details = () => {
    const { mediaType, id } = useParams();
    const {data, loading} = useFetch(`/${mediaType}/${id}/videos`)
    const {data: credits, loading: creditsLoading} = useFetch(`/${mediaType}/${id}/credits`)
    return (
        <div>
            <DetailsBanner video={data?.results?.[0]} crew={credits?.crew}></DetailsBanner>
            <Cast data={credits?.cast} loading={creditsLoading}></Cast>
            <VideosSection data={data} loading={loading}></VideosSection>
            <Similar mediaType={mediaType} id={id}></Similar>
            <Recommendation mediaType={mediaType} id={id}></Recommendation>
        </div>
    );
};

export default Details;