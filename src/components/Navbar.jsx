import React, { useContext } from 'react'
import { Link } from "react-router-dom";
//!👆 Link kısmı a href ti biz bunu React royuterdan import edip Link e cevirdik 
import avatar from "../assets/icons/avatar.png"
import { AuthContext } from '../context/AuthContextProvider';


const Navbar = () => {
    const { currentUser } = useContext(AuthContext)
    //! Ben AuthContextProvider in içinde ki göndermiş oldugum degeri obje olrak gönderdiğimden buradada obje oldugunu baz alarak işlem yapıcam. yani AuthContext.Provider value={{currenUser}} seklinde olması obje oldugunu gösteriyor bize.Ve bu yüzden dest. yapıcam yani hangi contexti kullanacaksam onu dest yöntemi ile alıp kullanıcam simdi bir tane contextim var ama birden fazla olabilirdi.
    //!✨❤Artık dinamik olarak benim Navbarda user bilgim var 
    // const currentUser = { displayName: "gamze ysr" };
    // const currentUser = false;

    return (
        <>

            <nav className="w-full flex flex-wrap items-center justify-between py-3 bg-gray-900 text-white  shadow-lg navbar fixed-top  ">
                <div className="container-fluid w-full flex  items-center justify-between px-6">

                    <Link className="text-2xl  pr-2 font-semibold" to="/">
                        Gamze's React Movie App ✨
                    </Link>


                    {/* Collapsible wrapper */}
                    {/* Right elements */}
                    <div className="flex items-center relative">
                        {/* Icon */}
                        {currentUser && (<h5 className='mr-2 capitalize'>{currentUser?.displayName}</h5>)}


                        <div className="dropdown relative">
                            <span
                                className="dropdown-toggle flex items-center hidden-arrow"
                                href="#"
                                id="dropdownMenuButton2"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img
                                    src={currentUser?.photoURL || avatar}
                                    //! 👆 currentUser varsa bana photoURLL yi göster yoksa avatarı göter dedik. 
                                    className="rounded-full"
                                    style={{ height: 25, width: 25 }}
                                    alt=""
                                    loading="lazy"
                                    referrerPolicy='no-referrer'
                                />
                            </span>
                            <ul
                                className="dropdown-menu min-w-max absolute  bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none left-auto right-0"
                                aria-labelledby="dropdownMenuButton2"
                            >
                                <li>
                                    <Link
                                        className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                        to={"/register"}
                                    >
                                        Register
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                        to={"/login"}
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    {/* {/* NBu logout olunca bir yere yönlandırmayecegimden bunu Link yerine span verdim  *👇/} */}
                                    <span
                                        className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                        role="button"
                                    >
                                        Logout
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Right elements */}
                </div>
            </nav >
            <div className="h-[52px]"> </div>
            {/* ☝Navbarla aynı yükseklikte bir class vericez navbarla aynı olsun istediğimiz için  */}
            {/* Bu son divimizi olusturmamızın sebebi navın altında kalmasın loginimiz  diye yaptık Bau son divi olusturup yukseklikverince Login sayfasının Navbarımızın altında kalmasını sağladık */}
        </>
    )
}

export default Navbar