import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navigation from './Navigation.jsx';
import logo from './assets/logo.svg';
import HomePage from './pages/HomePage/HomePage.jsx';
import BeachesPage from './pages/BeachesPage/BeachesPage.jsx';
import BeachDetailPage from './pages/BeachDetailPage/BeachDetailPage.jsx';
import TodaysMatchPage from './pages/TodaysMatchPage/TodaysMatchPage.jsx';
import SignInPage from './pages/SignInPage/SignInPage.jsx';
import RegisterPage from './pages/RegisterPage/RegisterPage.jsx';
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx';
import ErrorPage from './pages/ErrorPage/ErrorPage.jsx';
import {use} from "react";

function App() {
  return (
      <>
        <header className="header">
          <img src={logo} alt="BeachMatch logo"/>
          <Navigation/>
        </header>
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