import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { AuthContext } from '../context/AuthContextProvider';



const API_KEY = "a9a90e58da935e5528540782b69aa0cf";
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const Main = () => {
  const [movies, setMovies] = useState([]);
  //! çektiğim veriyi bu state a atmak için burada state olusturdum
  const [searchTerm, setSearchTerm] = useState("");
  //!👆 bu statei search butonu için oluşturduk 
  const [loading, setloading] = useState(false)
  //!👆 loading olustrmak için loading state i olusturyoruz ve bu loading i nerede kullanacaksak orada cagırıyoruz.
  const { currentUser } = useContext(AuthContext);


  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);
  //! verimi çektim👆


  const getMovies = (API) => {
    setloading(true)
    //!👆 datayı cekmeye baslamadan önce benim loading im true olsun dedik.
    axios
      .get(API)
      .then((res) => setMovies(res.data.results))
      //! 👆bu datamı atrık ben setMovies ımın içine atabilirim.çektiğim verimi ben değişkene ugrayan metoun içine atıyorum.
      //! Artık bu atmış oldugum setMoviesin içindeki datamı kullanmak kalıyor geriye.Bir HTML yapısı içinde datayı kullancaz
      .catch((err) => console.log(err))
      //! errorumu yakalamak için catch i kulllanıyorum 
      .finally(() => setloading(false));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm && currentUser) {
      getMovies(SEARCH_API + searchTerm);
      setSearchTerm("");
    } else if (!currentUser) {
      alert("please log in to see details");
    } else {
      alert("please enter a text");
    }

    // Burada setSearchTerm u sıfırladık ve setSearchTerm un da inputa bağlı olması için value ye baglamamız lazım
  };
  //! burada handleSubmit yaparak handle submitbutonuna bağlı yeniden getMovies verimizi çektik 


  return (
    <>
      <form className='flex justify-center p-2' onSubmit={handleSubmit}>
        {/*👆buradda onSubmit edince yeni bir data ceksin bana diye handleSubmit butonunu oluşturduk */}
        <input type="search"
          className='w-80 h-8 rounded-md outline-none border p-1 m-2'
          placeholder='Search a movie...'
          onChange={(e) => setSearchTerm(e.target.value)}
          //!👆 oluşturmuş oldugum statei buraya onchange e attım. 
          value={searchTerm}
        // Burada value ye  searchTerm a bağlı veriyoruz .
        />
        <button className='text-white' type="submit">Search</button>
      </form>
      <div className='flex justify-center flex-wrap'>
        {/* ✨flex-wrap ✨  ile küçüldükçe büyüdükce sayfa taşmaları önlemek içn koyduk  */}
        {loading ? (
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600 mt-52"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          movies.map((movie) => <MovieCard key={movie.id} {...movie} />)
        )}
        {/* buradan cekip mapladığım veriyi çektiğim veriyi MovieCard ıma bastım .ekrana basacagım veriyi aynı sekilde basacagımdan ilk movies halinin alıp basıyorum */}
      </div>
    </>
  );
};

export default Main;





