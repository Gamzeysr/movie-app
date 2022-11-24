import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContextProvider';


const IMG_API = "https://image.tmdb.org/t/p/w1280";
const defaultImage =
    "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";

const MovieCard = ({ poster_path, title, overview, vote_average, id }) => {
    //!👆 Burada İdmin içinde gösterecek olduklarımı props dediğim şeyleri yakalıyorum. 
    const { currentUser } = useContext(AuthContext);
    //!👆 AuthContextini çağırdık burada bu sekilde 
    // console.log(title);

    const getVoteClass = (vote) => {
        if (vote >= 8) {
            return "green"
        } else if (vote >= 6) {
            return "orange"
        } else {
            return "red"
        }
    }
    //!👆 Taglara dinamik olarak renk vermek için bu javascript fnknunu kullandık 

    return (
        <div className='movie'
        >
            <img
                loading='lazy'
                src={poster_path ? IMG_API + poster_path : defaultImage}
                //!👆 burada poster_path varsa ımg_api ve poster_path i göster dedik eger yoksa defaultImage i göster dedik.
                alt='movie-card'
            />

            <div className='flex align-baseline justify-between p-1 text-white'>
                <h5>{title}</h5>
                {currentUser && (<span className={`tag ${getVoteClass(vote_average)}`}>
                    {vote_average.toFixed(1)}
                </span>)}
                {/*👆 burda currentUser true sa bana vote_average ı göster dedim.Yani currenUser dediğim sey kullanıcı giriş yaptıysa vote_average i göster demiş oluyorum. */}
                {/*✨✨ Ben simdi bu tag dediğim yerin dinamik olmasını istiyorum ve dinamik olsun diye bi fonk tanımllıcam ve bu javascript fonk oldugundan buraya kazarkende süslü parantez içine yazıcam çünkü javascript metodunu jsx in içinde yazarken {} nün içine alarak yazıyoruz. */}
            </div>

            <div className='movie-over'>
                <h2>Overwiew</h2>
                <p>{overview}</p>
            </div>
        </div>
    )
}

export default MovieCard;