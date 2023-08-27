import  { useEffect } from 'react';
import { fetchDataFromApi } from './utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { getApiConfiguration } from './store/homeSlice';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Details from './pages/Details/Details';
import SearchResult from './pages/SearchResult/SearchResult';
import Explore from './pages/Explore/Explore';
import PageNotFound from './pages/404/PageNotFound';
import Header from './components/Header/Header';
// import Footer from './components/Footer/Footer';

function App() {
  const dispatch  = useDispatch();
  const url = useSelector((state) => state.home.url)
  console.log(url);

  useEffect(() => {
    const fetchApiConfig = async () => {
      try {
        const res = await fetchDataFromApi('/configuration');
        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
        };
        dispatch(getApiConfiguration(url));
      } catch (error) {
        console.log(error.message);
      }
    };
  
    fetchApiConfig();
  }, []);
  

  return (
    <BrowserRouter>
    <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}/>
        <Route path="/:mediaType/:id" element={<Details></Details>}/>
        <Route path="/search/:query" element={<SearchResult></SearchResult>}/>
        <Route path="/explore/:mediaType" element={<Explore></Explore>}/>
        <Route path="*" element={<PageNotFound></PageNotFound>}/>
      </Routes>
      {/* <Footer></Footer> */}
    </BrowserRouter>
  );
}

export default App;