// import { useParams } from 'react-router-dom';
// import useFetch from '../../hooks/useFeatch';
import DetailsBanner from './DetailsBanner/DetailsBanner';
import './style.scss'

const Details = () => {
    // const { mediaType, id } = useParams();
    // const {data, loading} = useFetch(`${mediaType}/${id}`)
    return (
        <div>
            <DetailsBanner></DetailsBanner>
        </div>
    );
};

export default Details;