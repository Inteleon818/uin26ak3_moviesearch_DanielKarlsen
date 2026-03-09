import '../styles/Movie.css'
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

{/*Film slug sider for når man klikker på en filmlenke på forsiden.*/}
export default function Movie() 
{
    const {movie} = useParams()
    console.log("movie_slug: ", movie)

    const [apiData, setApiData] = useState({})

    const apiKey = import.meta.env.VITE_APP_API_KEY

    const baseUrl = `http://www.omdbapi.com/?t=${movie}&type="movie"&apikey=`

    const getMovie = async() => 
    {
        try 
        {
            const response = await fetch(`${baseUrl}${apiKey}`)
            console.log("Movie_response: ", response)
            const data = await response.json()
            setApiData(data)
            console.log("Movie_data: ", data)
        }
        catch(err)
        {
            console.error(err)
        }
    }

    console.log("Movie_apiData: ", apiData)

    useEffect(() => 
    {
        getMovie()
    }, [])

    return (
        <main>
            <Link to="/"><h2>Tilbake til forsiden</h2></Link>

            <img src={apiData?.Poster} alt={movie}></img>
            <h1>{movie}</h1>
            <p>{apiData?.Released}</p>
            <p>{apiData?.Plot}</p>
            <p>{apiData?.Actors}</p>
            <p>{apiData?.Genre}</p>
        </main>
    )
} 