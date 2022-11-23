import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';

const API_KEY = "a9a90e58da935e5528540782b69aa0cf";
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const Main = () => {
  const [movies, setMovies] = useState([]);
  //! çektiğim veriyi bu state a atmak için burada state olusturdum

  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);
  //! verimi çektim👆



  const getMovies = (API) => {
    axios
      .get(API)
      .then((res) => setMovies(res.data.results))
      //! 👆bu datamı atrık ben setMovies ımın içine atabilirim.çektiğim verimi ben değişkene ugrayan metoun içine atıyorum.
      //! Artık bu atmış oldugum setMoviesin içindeki datamı kullanmak kalıyor geriye.Bir HTML yapısı içinde datayı kullancaz
      .catch((err) => console.log(err));
    //! errorumu yakalamak için catch i kulllanıyorum 
  }


  return (
    <div className='flex justify-center flex-wrap'>
      {/* ✨flex-wrap ✨  ile küçüldükçe büyüdükce sayfa taşmaları önlemek içn koyduk  */}
      {movies.map(movie => <MovieCard key={movie.id} {...movie} />)}
      {/* buradan cekip mapladığım veriyi çektiğim veriyi MovieCard ıma bastım .ekrana basacagım veriyi aynı sekilde basacagımdan ilk movies halinin alıp basıyorum */}
    </div>
  )
}

export default Main;



