import HeroBanner from './HeroBanner/HeroBanner';
import './style.scss'
import Trending from "./Trending/Trending"
const Home = () => {
    return (
        <div className='homePage'>
            <HeroBanner></HeroBanner>
            <Trending></Trending>
            <div style={{height: 1000}}></div>
        </div>
    );
};

export default Home;