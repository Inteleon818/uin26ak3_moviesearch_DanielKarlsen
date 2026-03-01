import { useEffect, useState } from "react"
import SearchResults from "../components/SearchResults"

export default function Home() 
{
    /*
    IKKE LAGRE SENSITIVE OPPLYSNINGER SOM API NØKLER EKSPLISITT I OFFENTLIGE FILER!
    LEGG DE I .env FILEN!
    */
    const apiKey = 'a97941bd'

    const [search, setSearch] = useState()
    const [apiData, setApiData] = useState()

    const baseUrl = `http://www.omdbapi.com/?s=${search}&type="movie"&apikey=`

    {/*Søket defaulter til 'James Bond' hvis ingen søk er gjort enda.*/}
    if (search === undefined) 
    {
        setSearch("James%20Bond")
    }

    const getMovies = async() => 
    {
        try 
        {
            const response = await fetch(`${baseUrl}${apiKey}`)
            console.log("Home_response: ", response)
            const data = await response.json()
            setApiData({data})
            console.log("Home_data: ", data)
            console.log("Home_apiData: ", apiData)
        }
        catch(err)
        {
            console.error(err)
        }
    }

    useEffect(() => 
    {
        getMovies()
    }, [])

    const handleChange = (e) => 
    { 
        {/*Setter søkeverdi hvis lengden på strengen i søkefeltet er 3 karakterer eller lengre.*/} 
        if (e.target.value.length >= 3)
        {
            setSearch(e.target.value) 
        }
        else 
        {
            setSearch("")
        }
        getMovies()
        console.log("Home_e.target.value: ", e.target.value)
        console.log("Home_e.target.value.length: ", e.target.value.length)
    }

    return (
        <main>
            <h1>Forside</h1>
            <form>
                <label>
                    Søk etter film:
                    <input type="search" name="movie_title_input" placeholder="Harry Potter" onChange={handleChange}></input>
                </label>
            </form>
            <SearchResults apiData={apiData} />
        </main>
    )
}
