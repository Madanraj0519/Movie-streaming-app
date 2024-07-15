
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Toaster} from "react-hot-toast"
import Header from './Componets/Header';
import Home from './Componets/Home';
import Login from './Pages/Login';
import Details from './Componets/Details';
import WatchList from './Componets/WatchList';
import Search from './Componets/Search';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import UserPrivateRoute from './PrivateRoute/UserPrivateRoute';

function App() {
  return (
  
      <>
        <BrowserRouter>
        <Header />
        <Routes>

          <Route path='/' element={<Login />} />
          <Route path='/sign-in' element={<SignIn />}/>
          <Route path='/sign-up' element={<SignUp />}/>
          
          <Route element={<UserPrivateRoute />}>
              <Route path='/home' element={<Home />}/>
              <Route path='/detail/:id' element={<Details />} />
              <Route path='/watchlist' element={<WatchList />} />
              <Route path='/search' element={<Search />} />
          </Route>

        </Routes>

        <Toaster position="top-right" reverseOrder={true} />
        </BrowserRouter> 
      </>
  );
}

export default App;
