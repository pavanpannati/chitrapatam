import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Search from './Search';
import Header from './Header';
import { Link } from 'react-router-dom';
import Sliding from './Sliding';
const MovieList = () => {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);  // ✅ Add filtered state
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8001/movies/",{ timeout: 5000 });
        setData(response.data);
        setFiltered(response.data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);



  const handleSearch = async (e) => {
  const keyword = e.target.value.toLowerCase();
  setSearchTerm(keyword);

  try {
    let url = "http://127.0.0.1:8001/movies/";
    if (keyword.length > 0) {
      url += `?search=${keyword}`;
    }

    const response = await axios.get(url);
    setFiltered(response.data);
  } catch (err) {
    setError("Search failed: " + err.message);
  }
};
  if (loading) return <div className="text-black text-center py-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-10">Error: {error}</div>;

  return (
    <div className='bg-black min-h-screen p-2'>
      <div className="flex items-center justify-between px-4 py-4 bg-black flex-wrap gap-4">
  <div className="flex-shrink-0">
    <Header />
  </div>

  <div className="flex-1">
    <Search value={searchTerm} onChange={handleSearch} />
  </div>
  
</div>
<div>
    <Sliding/>
  </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-2 place-items-center'>
        {filtered.map((post,index) => (
          <Link to={`/movies/${post.title}`} key={post.id} className="block">
          <div 
          key={post.id} 
          className="w-[180px] bg-neutral-700 rounded-xl overflow-hidden shadow-lg hover:scale-* transition duration-300 p-1 hover:bg-neutral-900 hover:scale-105 animate-fadeIn" 
          style={{
          opacity:0,
          animationDelay: `${index * 0.1}s`, // Delay increases for each card (200ms apart)
          animationDuration: '0.8s',
          animationFillMode: 'forwards',
        }}>
            <div className='relative'>
            <img
              src={post.poster_url}
              alt={post.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded overlay">
    {new Date(post.release_date).getFullYear()} {/* or format it like "2025-06-21" */}
    
  </div>
  <img src="/chitrapatam.png" alt="no image" className="absolute right-1 bottom-1 w-16 h-16 bg-black bg-opacity-20 text-white text-xs px- py-0 rounded overlay"/>
            </div>
            <div className="p-4">
              <h2 className="text-md font-semibold text-amber-100">{post.title}</h2>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
