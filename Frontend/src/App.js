
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Toaster} from "react-hot-toast"
import Header from './Componets/Header';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Details from './Pages/Details';
import WatchList from './Pages/WatchList';
import Search from './Pages/Search';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import UserPrivateRoute from './PrivateRoute/UserPrivateRoute';
import ActorDetails from './Pages/ActorDetails';
import Series from './Pages/Series';
import ProductionHouseMovies from './Pages/ProductionHouseMovies';
import AdminPage from './Pages/AdminPage';
import VideoPlayer from './Componets/VideoPlayer';
import Footer from './Componets/Footer';

function App() {
  return (
  
      <>
      <BrowserRouter>
        <Header />
        <Routes>

           <Route path='/' element={<Login />} />
           <Route path='/sign-in' element={<SignIn />}/>
           <Route path='/sign-up' element={<SignUp />}/>

           <Route path='/home' element={<Home />}/>
           <Route path='/detail/:id' element={<Details />} />
           <Route path='/actor/:id' element={<ActorDetails />} />
           <Route path='/watchlist' element={<WatchList />} />
           <Route path='/search' element={<Search />} />
           <Route path='/series' element={<Series />} />
           <Route path='/productionMovies/:id/:url' element={<ProductionHouseMovies />} />
           <Route path='/watch/:id' element={<VideoPlayer />} />
          
           <Route element={<UserPrivateRoute />}>
             <Route path='/admin/profile' element={<AdminPage />} />        
           </Route>

        </Routes>
        <Footer />

        <Toaster position="top-right" reverseOrder={true} />
      </BrowserRouter> 
      </>
  );
}

export default App;
