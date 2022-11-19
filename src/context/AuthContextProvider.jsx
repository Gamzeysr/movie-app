import React, { useEffect, createContext, useState } from 'react'
import { userObserver } from '../auth/firebase';

export const AuthContext = createContext();
//!👆Burada createContext metodunnu AuthContext adını verip olusturup import ettik.DİKKAT!! İstediğimiz ismi verebiliyoruz .Ve bu contextin bir provider ı var.Provider'i contexti nerede kullancaksam,kullancacagım componenti sarmallıyorum.
//?mesela; logini contextlicem diyelim o zaman logini provider ile sarmallıyorum.

const AuthContextProvider = ({ children }) => {
    //! buradaki {children} bildiğimiz props 👆burada desct. yapıp asagıda children seklinde kullanıyoruz.Bu Props bana app.js de sarmalladıgım yerden yerdi.
    const [currentUser, setCurrentUser] = useState(false)


    useEffect(() => {
        userObserver();
        //! 👆 Bu methodu firebaseden cagırdık 
    }, [])


    return (
        <AuthContext.Provider value={{ currentUser }}>
          //! 👆  Ben app.js de ki sarmalladıgım yapıya bir value nin içindeki currentUser i göndericem.
            {children}
            {/* Benim buradaki componentten göndereck oldugum tüm childrrenları sarmalla diyoruz. Ve ne göndericeksem onu valuenin içine yazıyorum */}
        </AuthContext.Provider>
    );
    //! Ben bu AuthContext imi userda ,navbarda neredeyse heryerde kullanacagım için bunu app.js de approuter a sarmalladım sarmallasam daha iyi olur. 

}

export default AuthContextProvider;