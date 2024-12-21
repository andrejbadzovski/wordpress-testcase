import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, setFilter, fetchApiConfig } from '../features/apiConfigSlice';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Home = () => {
    const dispatch = useDispatch();
    const { movies, filter, moviesStatus, moviesError, apiKey, apiEndpoint } = useSelector((state) => state.apiConfig);

    const [rating, setRating] = useState(''); 

    useEffect(() => {
        if (!apiKey || !apiEndpoint) {
            dispatch(fetchApiConfig()); 
        } else {
            dispatch(fetchMovies()); 
        }
    }, [dispatch, apiKey, apiEndpoint]);

    const filteredMovies = movies.filter((movie) => {
        const matchesTitle = movie.title && movie.title.toLowerCase().includes(filter.toLowerCase());
        const matchesRating = rating ? movie.vote_average >= parseFloat(rating) : true; 
        return matchesTitle && matchesRating;
    });

    return (
        <div className="p-4 bg-gray-100">
            <Helmet>
                <title>Home - Popular Movies</title>
                <meta name="description" content="Browse a list of trending movies." />
            </Helmet>
            <h1 className="text-3xl font-bold mb-4">Movies</h1>
            <div className="flex flex-wrap w-1/2 gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={filter}
                    onChange={(e) => dispatch(setFilter(e.target.value))}
                    className="w-full md:w-1/2 p-2 border border-gray-300 rounded"
                />
                <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full md:w-1/4 p-2 border border-gray-300 rounded"
                >
                    <option value="">All Ratings</option>
                    <option value="8">8 and above</option>
                    <option value="7">7 and above</option>
                    <option value="6">6 and above</option>
                    <option value="5">5 and above</option>
                </select>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredMovies.map((movie) => (
                    <Link
                        key={movie.id}
                        to={`/movie/${movie.id}`}
                        className="block bg-white rounded shadow-lg overflow-hidden"
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="w-full h-auto"
                        />
                        <div className="p-2 bg-gray-800 text-center">
                            <h2 className="text-lg font-bold text-white">{movie.title}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Home;
