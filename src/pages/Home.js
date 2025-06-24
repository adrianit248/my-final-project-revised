import { useEffect, useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import MovieListHeading from '../components/MovieListHeading';
import Searchbox from '../components/Searchbox';
import { useNavigate, useParams } from 'react-router-dom';
import loading_gif from '../loading_gif.gif'



function Home(props, idVal, setIdVal) {
    let navigate = useNavigate();
    const [loading, setLoading] = useState(false) 
    const [movies, setMovies] = useState([])
    const [searchValue, setSearchValue] = useState('')


    //  any time the search value is changed (by initiating a search) getMovieRequest parses th search and returns results
    useEffect(() => {
        const searchLength = searchValue.length

        {searchValue !== '' ? (searchLength > 2 ? getMovieRequest(searchValue) : alert('Not enough text. Please refine your search')) : <></>}
    }, [searchValue])


    //  whenever the search value is changed / you click the Magnifying Glass or hit ENTER it will parse the new search.
    //  After the search is parsed with your new search critera, the new search result array is passively rendered
    const getMovieRequest = async (searchValue) => {

        // By setting loading to true, it will activate the spinner wheel loading state
        setLoading(true)

        // Now it makes the awaited API call and unlocks the promise
        const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=${process.env.REACT_APP_API_KEY}`
        const response = await axios.get(url)

        // the unlocked array is further refined to reference the direct values,
        // sliced into 6 elements, and stored in a final responseArray variable
        const responseArray = (response.data.Search).slice(0,6)

        // As long as the data exists (it should reliably exist due to conditional ternary
        // operators that dictated the search criteria), the movies array will be updated based
        // on the parsed search results
        {response.data.Search ? setMovies(responseArray) : <></>}

        // The loading spinner wheel is allotted 1 full second regardless to express a mock
        // loading state
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }


    //  filters movies based on an onChange event in the corresponding select element
    function filterMovies(filter) {
        if (filter === "OLDEST_TO_NEWEST") {
            setMovies(movies.slice().sort((a, b) => (a.Year) - (b.Year)))
        }
        if (filter === "NEWEST_TO_OLDEST") {
            setMovies(movies.slice().sort((a, b) => (b.Year) - (a.Year)))
        }
    }


    //  The HTML elements / visual representation
    return (
        <div className="movie-container">
        
            {/* The header section at the top of the page */}
            <div className='header-bar'>
                <MovieListHeading heading={'Movies'} />
                <Searchbox searchValue={searchValue} setSearchValue={setSearchValue} /> 
            </div>

            {/* The search filter below the header / above the movie search results */}
            <div className="filter-container"> 
                <select defaultValue={'Sort By:'} className="sortFilter" 
                onChange={(event) => filterMovies(event.target.value)}
                >
                    <option disabled>Sort By:</option>
                    <option value="OLDEST_TO_NEWEST" >
                        Oldest to Newest
                    </option>
                    <option value="NEWEST_TO_OLDEST" >
                        Newest to Oldest
                    </option>
                </select>  
            </div>

            {/* The movie row div is used to style / structure the layout of the movie results */}

            {/* The bracketed section encompasses all of what is displayed in the movie search results
                and its dynamic expression is dependent on output from the movies array */}
            <div className='movie-row'>
                {loading
                ?   <div className="loading-spinner-container">
                        <div className='loading-spinner'><img src={loading_gif} alt="" /></div>
                    </div>
                :   <>
                        {movies.map((movie) => 
                            <div className='movie-card image-container' key={movie.imdbID}
                            onClick={() => {navigate(`/${movie.imdbID}`)}}
                            >
                                <img className='movie-poster' src={movie.Poster} alt='movie'></img>
                                <p className='movie-title'>{movie.Title}</p>
                                <p className='movie-title'>Released: {movie.Year}</p>
                            </div>
                        )}
                    </>
                }
            </div>
        </div>
    );
}

export default Home;