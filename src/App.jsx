import  { useEffect } from 'react';
import { fetchDataFromApi } from './utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { getApiConfiguration, getGenres } from './store/homeSlice';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Details from './pages/Details/Details';
import SearchResult from './pages/SearchResult/SearchResult';
import Explore from './pages/Explore/Explore';
import PageNotFound from './pages/404/PageNotFound';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import PrivateRoute from './routes/PriveteRoute';
import Per from './pages/Per/Per';
function App() {
  const dispatch  = useDispatch();
  const url = useSelector((state) => state.home.url)
  // console.log(url);

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
    genresCall();
  }, []);

  const genresCall = async() =>{
    let promise = []
    let endPoints = ['tv', 'movie']
    let allGenres = {}
    endPoints.forEach( (url) =>{
      promise.push(fetchDataFromApi(`/genre/${url}/list`))
    })

    const data = await Promise.all(promise);
    data.map(({genres}) =>{
      return genres.map((item) => (allGenres[item.id] = item))
    })
    dispatch(getGenres(allGenres))
  }

  

  return (
    <BrowserRouter>
    <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}/>
        <Route path="/:mediaType/:id" element={<Details></Details>}/>
        <Route path="/search/:query" element={<PrivateRoute><SearchResult></SearchResult></PrivateRoute>}/>

        <Route path="/explore/:mediaType" element={<PrivateRoute><Explore></Explore></PrivateRoute>}/>
        <Route path="/per" element={<PrivateRoute><Per></Per></PrivateRoute>}/>

        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signUp" element={<SignUp></SignUp>}></Route>
        <Route path="*" element={<PageNotFound></PageNotFound>}/>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
