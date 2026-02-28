import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Movie from "./Movie"

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
        console.log(e.target.value)
        console.log(e.target.value.length)
        {/*Kjører 'getMovies()' funksjonen hvis lengden på strengen i søkefeltet er 3 karakterer elle lengre.*/}
        if (e.target.value.length >= 3)
        {
            setSearch(e.target.value)
            
        }
        getMovies()
    }

    return (
        <main>
            <h1>Forside</h1>
            <form>
                <label>
                    Søk etter film:
                    <input type="search" name="movie_title" placeholder="Harry Potter" onChange={handleChange}></input>
                </label>
            </form>
            <section>
                {/*Oppretter dynamiske filmkomponenter om hver film som dukker opp i listen etter søk.*/}
                {/*'404' meldinger dukker opp på konsollen hvis bildet ikke finnes.*/}
                {apiData?.data?.Search?.map((item, index) => <Movie key={item?.Title+"_"+index+"_key"} image={item?.Poster} title={item?.Title} releaseYear={item?.Year} />)} 
            </section>
        </main>
    )
}
