import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from '../Components/MovieList';

const MovieDetail = () => {
  const { title } = useParams();
  const [movie, setMovie] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [error, setError] = useState(null);

  // Fetch main movie details
  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get(`http://127.0.0.1:8001/movies/${title}`)
      .then((res) => {
        setMovie(res.data);

        // ✅ Once main movie is fetched, fetch related movies by genre
        const genre = res.data.genres?.split(',')[0]; // use first genre
        if (genre) {
          axios.get(`http://127.0.0.1:8001/movies/?genre=${genre.trim()}`)
            .then((genreRes) => {
              const others = genreRes.data.filter(m => m.title !== res.data.title);
              setRelatedMovies(others);
            });
        }
      })
      .catch((err) => setError(err.message));
  }, [title]);

  if (error) return <div className="text-red-500 text-center py-10">Error: {error}</div>;
  if (!movie) return <div className="text-white text-center py-10">Loading...</div>;

  return (
    <div className="bg-black text-white p-1 min-h-screen">
      <div className="">
        <h1 className="text-8xl text-gold-100 text-capitalize font-rubik80s mb-2 animate-fadeIn uppercase " 
        style={{ opacity: 0, animationDelay: '0s', animationFillMode: 'forwards', animationDuration: '1s'}}>{movie.title}</h1>
        <img src={movie.poster_url} alt={movie.title} className="w-full h-full object-cover mb-4 rounded animate-fadeIn" 
        style={{ opacity: 0, animationDelay: '1s', animationFillMode: 'forwards', animationDuration: 's'}} />
        
        <p className="text-sm text-gray-400 mb-4 animate-fadeIn" 
        style={{ opacity: 0, animationDelay: '2s', animationFillMode: 'forwards', animationDuration: '1s'}}>{new Date(movie.release_date).toDateString()}</p>
        <p className='animate-fadeIn'
        style={{ opacity: 0, animationDelay: '3s', animationFillMode: 'forwards', animationDuration: '1s'}}
        ><strong className='text-silver-200'>Director:</strong> {movie.director}</p>
        <p className='animate-fadeIn'
        style={{ opacity: 0, animationDelay: '4s', animationFillMode: 'forwards', animationDuration: '1s'}}
        ><strong>Writer:</strong> {movie.writer}</p>
        <h2 className="text-xl font-semibold mt-6 mb-2 text-white animate-fadeIn"
        style={{ opacity: 0, animationDelay: '5s', animationFillMode: 'forwards', animationDuration: '1s'}}
        >Cast</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {movie.cast.map((person) => (
        <div
        key={person.id}
        className="bg-neutral-800 p-3 rounded-xl hover:shadow-xl transition duration-300"
        >
        <img
        src={person.image}
        alt={person.actor_name}
        className="w-full h-48 object-cover rounded-md"
        />
        <h3 className="text-lg font-semibold text-amber-100 mt-2">{person.actor_name}</h3>

        {person.movies.length > 0 && (
        <>
          <p className="text-sm text-gray-400 mt-1">Also appeared in:</p>
          <ul className="list-disc pl-4 text-sm text-white">
            {person.movies.map((m) => (
              <li key={m.id}>{m.title}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  ))}
</div>


        <p className='animate-fadeIn' style={{ opacity: 0, animationDelay: '6s', animationFillMode: 'forwards', animationDuration: '1s'}}><strong>Genres:</strong> {movie.genres}</p>
        <p className="mt-4 animate-fadeIn"
        style={{ opacity: 0, animationDelay: '7s', animationFillMode: 'forwards', animationDuration: '1s'}} >
        <strong >Overview:</strong>
        <br />{movie.overview}</p>
        <p className='animate-fadeIn' style={{ opacity: 0, animationDelay: '8s', animationFillMode: 'forwards', animationDuration: '1s'}}><strong>Streaming On:</strong> {movie.streaming_on}</p>
      </div>
      {/* ✅ Related Movies Section */}
        {relatedMovies.length > 0 && (
          
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4 text-white">
              More {movie.genres?.split(',')[0]} Movies
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2 place-items-center">
              {relatedMovies.map((item) => (
                <Link to={`/movies/${item.title}`} key={item.id} className="block">
                <div key={item.id} className="bg-black p-1 rounded-xl w-[180px] hover:bg-neutral-800 transition border p-2 animate-fadeIn">
                  <img src={item.poster_url} alt={item.title} className="w-full h-64 object-cover rounded" />
                  <h3 className="text-md font-semibold text-silver-300 mt-2">{item.title}</h3>
                </div>
                </Link>
              ))}
            </div>
          </div>
          
         ) }
    </div>
  );
};

export default MovieDetail;
