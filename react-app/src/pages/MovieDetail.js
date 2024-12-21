import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieDetail, fetchApiConfig } from '../features/apiConfigSlice';
import { Helmet } from 'react-helmet';

const MovieDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // React Router's navigation hook
    const dispatch = useDispatch();
    const { apiKey, apiEndpoint, movieDetail,} = useSelector((state) => state.apiConfig);

    useEffect(() => {
        if (!apiKey || !apiEndpoint) {
            dispatch(fetchApiConfig());
        }
    }, [dispatch, apiKey, apiEndpoint]);

    useEffect(() => {
        if (id && apiKey && apiEndpoint) {
            dispatch(fetchMovieDetail(id));
        }
    }, [dispatch, id, apiKey, apiEndpoint]);

    if (!movieDetail) return <p>Movie not found.</p>;

    return (
        <div
            className="relative flex flex-wrap min-h-screen w-full gap-10 items-center p-10 text-white"
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetail.backdrop_path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Helmet>
                <title>{movieDetail.title} - Movie Details</title>
                <meta name="description" content={movieDetail.overview} />
            </Helmet>
            
            <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>
            
            <button
                onClick={() => navigate(-1)} // Navigate to the previous page
                className="absolute top-5 left-5 bg-gray-800 text-white py-2 px-4 rounded-lg shadow-lg z-20 hover:bg-gray-700"
            >
                Back
            </button>

            <div className="relative z-10 flex flex-col items-center bg-gray-800 p-5 rounded-lg shadow-md">
                <img 
                    className="w-full max-w-sm h-full rounded-lg" 
                    src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`} 
                    alt={movieDetail.title} 
                />
                <h3 className="my-3 text-2xl font-bold">{movieDetail.title}</h3>
            </div>

            <div className="relative z-10 flex flex-col gap-4 bg-gray-800 p-5 rounded-lg shadow-md w-full max-w-3xl mt-5">
                <h4 className="text-xl font-semibold">Description</h4>
                <p>{movieDetail.overview}</p>
                
                <div className="flex gap-2">
                    <h3 className="font-bold">Genre:</h3>
                    <h3>{movieDetail.genres?.map((genre) => genre.name).join(', ')}</h3>
                </div>
                
                <div className="flex gap-2">
                    <h3 className="font-bold">Duration:</h3>
                    <h3>{movieDetail.runtime} Minutes</h3>
                </div>
                
                <div className="flex gap-2">
                    <h3 className="font-bold">Release Date:</h3>
                    <h3>{movieDetail.release_date}</h3>
                </div>
                
                <div className="flex gap-2">
                    <h3 className="font-bold">Rating:</h3>
                    <h3>{movieDetail.vote_average}</h3>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
