import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchApiConfig = createAsyncThunk('apiConfig/fetchConfig', async () => {
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/wp-json/api-plugin/v1/config`;
    const response = await axios.get(apiUrl);
    return response.data;
});

export const fetchMovies = createAsyncThunk('apiConfig/fetchMovies', async (_, { getState }) => {
    const { apiKey, apiEndpoint } = getState().apiConfig;
    const response = await axios.get(`${apiEndpoint}movie/popular?api_key=${apiKey}&language=en-US&page=1`);
    return response.data.results;
});

export const fetchMovieDetail = createAsyncThunk('apiConfig/fetchMovieDetail', async (id, { getState }) => {
    const { apiKey, apiEndpoint } = getState().apiConfig;
    const response = await axios.get(`${apiEndpoint}movie/${id}?api_key=${apiKey}&language=en-US`);
    return response.data;
});

const apiConfigSlice = createSlice({
    name: 'apiConfig',
    initialState: {
        apiKey: null,
        apiEndpoint: null,
        movies: [],
        filter: '',
        status: 'idle', 
        moviesStatus: 'idle', 
        error: null,
        moviesError: null,
        movieDetail: null,
        movieDetailStatus: 'idle',
        movieDetailError: null,
    },
    reducers: {
        setFilter(state, action) {
            state.filter = action.payload; 
        },
    },
    extraReducers: (builder) => {

        builder
            .addCase(fetchApiConfig.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchApiConfig.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.apiKey = action.payload.api_key;
                state.apiEndpoint = action.payload.api_endpoint;
            })
            .addCase(fetchApiConfig.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });

        builder
            .addCase(fetchMovies.pending, (state) => {
                state.moviesStatus = 'loading';
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.moviesStatus = 'succeeded';
                state.movies = action.payload;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.moviesStatus = 'failed';
                state.moviesError = action.error.message;
            });
        builder
            .addCase(fetchMovieDetail.pending, (state) => {
                state.movieDetailStatus = 'loading';
            })
            .addCase(fetchMovieDetail.fulfilled, (state, action) => {
                state.movieDetailStatus = 'succeeded';
                state.movieDetail = action.payload;
            })
            .addCase(fetchMovieDetail.rejected, (state, action) => {
                state.movieDetailStatus = 'failed';
                state.movieDetailError = action.error.message;
            });
    },
});

export const { setFilter } = apiConfigSlice.actions;

// Export reducer
export default apiConfigSlice.reducer;
