import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import loading_gif from '../loading_gif.gif'

const Movies = (props) => {

    //  initialize searchMovie to an empty object, so that it can later
    //  be assigned the object value of the corresponding movie and all
    //  of its components
    const [movieData, setMovieData] = useState({})
    const id = useParams()
    const filmId = id.id

    const [loading, setLoading] = useState(true)
    
    //  initialize navigate() for use with the back button
    const navigate = useNavigate()

    //  on mount, useEffect will call getMovie()
    useEffect(() => {
        console.log(filmId)
        
        setTimeout(() => {
            getMovie(filmId)    
        }, 1000);
    }, [])

    //  (Receiving the ID as a passed prop from useEffect on mount- and 
    //  which is tied to a passed value from the Home page onClick)

    //  Searches the API for the specific movie ID, collects the object 
    //  and component values for said ID, and then assigns it all as an 
    //  update to the searchMovie object variable
     const getMovie = async (filmId) => {
        const url = `http://www.omdbapi.com/?i=${filmId}&apikey=a7004db5`
        const response = await axios.get(url)

        const responseObject = (response.data)
        console.log(responseObject)
        {response ? setMovieData(responseObject) : <></>}

        // setMovieData(response)
        console.log(movieData)
        setLoading(false)
    }

    return (
        <div className="idmovie-container-all">

            {loading
            ?   <div className="loading-spinner-container">
                    <div className='loading-spinner'><img src={loading_gif} alt="" /></div>
                </div>
            :   <div className="full-display">
                    <button className="back-btn" onClick={() => {navigate('/')}}>← Back</button>

                    <div className="idmovie-container">
                        <div className="idmovie-row">
                            <div className='idmovie-display'>
                                <div className="poster-container">
                                    <img className='idmovie-poster' src={movieData.Poster} alt='movie'></img>
                                </div>
                                <div className='idmovie-info-section'>
                                    <p className='idmovie-title'>Title: {movieData.Title}</p>
                                    <p className='idmovie-rated'>Rating: {movieData.Rated}</p>
                                    <p className='idmovie-released'>Released: {movieData.Released}</p>
                                    <p className='idmovie-runtime'>Runtime: {movieData.Runtime}</p>
                                    <p className='idmovie-genre'>Genre: {movieData.Genre}</p>
                                    <p className='idmovie-director'>Director: {movieData.Director}</p>
                                    <p className='idmovie-writer'>Writer: {movieData.Writer}</p>
                                    <p className='idmovie-actors'>Actors: {movieData.Actors}</p>
                                    <p className='idmovie-plot'>Plot: {movieData.Plot}</p>
                                    <p className='idmovie-language'>Language: {movieData.Language}</p>
                                    <p className='idmovie-country'>Country: {movieData.Country}</p>
                                    <p className='idmovie-awards'>Awards: {movieData.Awards}</p>
                                    <p className='idmovie-metascore'>Metascore: {movieData.Metascore}</p>
                                    <p className='idmovie-boxoffice'>Box Office: {movieData.BoxOffice}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
};

export default Movies;
