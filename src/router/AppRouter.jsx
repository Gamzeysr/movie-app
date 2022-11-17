import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//✨ İlk önce router kullanacaksam bütün routelarımızı sarmallayan BrowserRuterimi import edip kullanmam gerekiyor 
import Main from "../pages/Main";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MovieDetail from "../pages/MovieDetail";
import Navbar from "../components/Navbar";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Navbar />
            {/*☝ Ben her yerde görünmesini istediğimden  routesların dısına koydum Navbarımı  */}
            <Routes>
                <Route path="/" element={<Main />} />
                 //! ☝Bu demek oluyor ki bana / seklinde component gelirse Main i çalıştır,render et bize
                <Route path="/login" element={<Login />} />
                //!login se case im bana Login sayfasını render et dedik.
                <Route path="/register" element={<Register />} />
                <Route path="/details/:id" element={<MovieDetail />} />
                {/* ☝ Burada dedim ki detailsden sonra ne gelirse gelsin bana MovieDetail imi cagırsın diyorum Ve bu yüzden path kısmı hep dinamik olacagından  :id mi kullanıyorum.  */}
            </Routes>
        </BrowserRouter>
    )
}


export default AppRouter;