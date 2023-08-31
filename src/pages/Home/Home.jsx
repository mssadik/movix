import HeroBanner from './HeroBanner/HeroBanner';
import Popular from './Popular/Popular';
import './style.scss'
import Trending from "./Trending/Trending"
const Home = () => {
    return (
        <div className='homePage'>
            <HeroBanner></HeroBanner>
            <Trending></Trending>
            <Popular></Popular>
            <div style={{height: "1000px"}}></div>
        </div>
    );
};

export default Home;