import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/AuthContextProvider'

const PrivateRouter = () => {
    const { currentUser } = useContext(AuthContext)


    return currentUser ? <Outlet /> : <Navigate to="/login" replace />
    //*✨✨ burada dedim ki currentUser ım varsa bana nested yapıda ki child route u return et yoksa Navigate ile de home a gitsin diye yönlendirdik ✨
    // <Outlet/> dediğim yer router da ki ayrıca Route ile sarmalladıgım yer .

}


export default PrivateRouter




//!✨ currentUser ımız varsa yok durumunu yapıcaz burada 