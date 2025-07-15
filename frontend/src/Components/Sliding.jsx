import React,{useEffect,useState} from 'react'
import axios from 'axios'

export default function Sliding() {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);

  // Fetch and sort images by date
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:8001/movies/"); // change URL to your API
        const sorted = response.data
          .sort((a, b) => new Date(b.upload_date) - new Date(a.upload_date)) // recent first
          .slice(0, 4); // only top 4
        setImages(sorted);
      } catch (error) {
        console.error("Failed to fetch images", error);
      }
    };

    fetchImages();
  }, []);

  // Auto-slide every 1s
  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  if (images.length === 0) {
    return <p className="text-center text-gray-500 mt-6">Loading images...</p>;
  }

  return (
    <div className="relative w-full p-1 overflow-hidden shadow-lg">
      <img
        src={images[current].poster_url}
        alt={`Slide ${current + 1}`}
        className="w-full h-64 object-cover transition-opacity duration-500"
      />

      {/* Prev Button */}
      <button
        onClick={() =>
          setCurrent((prev) => (prev - 1 + images.length) % images.length)
        }
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded"
      >
        <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={() =>
          setCurrent((prev) => (prev + 1) % images.length)
        }
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded"
      >
        <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full ${
              idx === current ? "bg-white" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}