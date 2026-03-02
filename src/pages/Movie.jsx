import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

{/*Film slug sider for når man klikker på en filmlenke på forsiden.*/}
export default function Movie() 
{
    const {movie} = useParams()
    console.log("movie_slug: ", movie)

    const [apiData, setApiData] = useState()

    /*
    IKKE LAGRE SENSITIVE OPPLYSNINGER SOM API NØKLER EKSPLISITT I OFFENTLIGE FILER!
    LEGG DE I .env FILEN!
    */
    const apiKey = 'a97941bd'

    const baseUrl = `http://www.omdbapi.com/?s=${movie}&type="movie"&apikey=`

    const getMovie = async() => 
    {
        try 
        {
            const response = await fetch(`${baseUrl}${apiKey}`)
            console.log("Movie_response: ", response)
            const data = await response.json()
            setApiData({data})
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
        <>
            <img src={apiData?.data?.Search?.[0]?.Poster} alt={movie}></img>
            <h1>{movie}</h1>
            <p>Release year: {apiData?.data?.Search?.[0]?.Year}</p>
            <p>ImdbID: {apiData?.data?.Search?.[0]?.imdbID}</p>
        </>
    )
} 