import React, { useEffect, createContext, useState } from 'react'
import { userObserver } from '../auth/firebase';

export const AuthContext = createContext();
//!1-👆Burada createContext metodunnu AuthContext adını verip olusturup import ettik.DİKKAT!! İstediğimiz ismi verebiliyoruz .Ve bu contextin bir provider ı var.Provider'i contexti nerede kullancaksam,kullancacagım componenti sarmallıyorum.
//?mesela; logini contextlicem diyelim o zaman logini provider ile sarmallıyorum.

const AuthContextProvider = ({ children }) => {
    //!2-👆burada AuthContextProvider adındaki componentimin tüm childlerini sarmalla diyorum.
    //! {children} bildiğimiz bir props Burada bu sekilde yazarak dest yapıp provider in aldtında doğrudan kullanıyoruz.
    const [currentUser, setCurrentUser] = useState(false)
    //!👆4-Burada bir user stati olusturduk.Bunu firebase de ki kullanacak oldugum userObserver metodunda da bunu yakalıyorum


    useEffect(() => {
        userObserver(setCurrentUser);
        //* 👆 Bu methodu firebaseden cagırdık *//
    }, [])


    return (
        <AuthContext.Provider value={{ currentUser }}>
          //!3-👆Burada ben gönderecek oldugum değerleri sarmalladım. Ben app.js de ki sarmalladıgım yapıya bir value nin içindeki currentUser i göndericem.
            {children}
            {/*👆 Benim buradaki componentten gönderecek oldugum tüm childrrenları sarmalla diyoruz. Ve ne göndericeksem onu valuenin içine yazıyorum */}
        </AuthContext.Provider>
    );
    //! Ben bu AuthContext imi userda ,navbarda neredeyse heryerde kullanacagım için bunu app.js de approuter a sarmalladım sarmallasam daha iyi olur. 

}

export default AuthContextProvider;