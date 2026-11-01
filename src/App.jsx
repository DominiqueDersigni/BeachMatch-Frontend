import './App.css';
import {Routes, Route, useLocation} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import BeachesPage from './pages/BeachesPage/BeachesPage.jsx';
import BeachDetailPage from './pages/BeachDetailPage/BeachDetailPage.jsx';
import TodaysMatchPage from './pages/TodaysMatchPage/TodaysMatchPage.jsx';
import SignInPage from './pages/SignInPage/SignInPage.jsx';
import RegisterPage from './pages/RegisterPage/RegisterPage.jsx';
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx';
import ErrorPage from './pages/ErrorPage/ErrorPage.jsx';
import {use} from "react";
import Navigation from "./Navigation.jsx";

function App() {
    const location = useLocation();

    return (
      <>
          {location.pathname !== "/register" && location.pathname !== "/signin" && <Navigation />}
        <main>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/signin" element={<SignInPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/beaches" element={<BeachesPage/>}/>
            <Route path="/beaches/:id" element={<BeachDetailPage/>}/>
            <Route path="/todaysmatch" element={<TodaysMatchPage/>}/>
            <Route path="*" element={<ErrorPage/>}/>
          </Routes>
        </main>
      </>
  );
}

export default App