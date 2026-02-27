import { useState } from "react"

export default function Home() 
{
    const [search, setSearch] = useState()

    const baseUrl = `http://www.omdbapi.com/?s=${search}&apikey=`
    /*
    IKKE LAGRE SENSITIVE OPPLYSNINGER SOM API NØKLER EKSPLISITT I OFFENTLIGE FILER!
    LEGG DE I .env FILEN!
    */
    const apiKey = 'a97941bd'
    const getMovies = async() => 
    {
        try 
        {
            const response = await fetch(`${baseUrl}${apiKey}`)
            const data = await response.json()
            console.log(data)
        }
        catch(err)
        {
            console.error(err)
        }
    }

    const handleChange = (e) => 
    {
        setSearch(e.target.value)
    }

    return (
        <main>
            <h1>Forside</h1>
            <form>
                <label>
                    Søk etter film
                    <input type="search" placeholder="Harry Potter" onChange={handleChange}></input>
                </label>
            </form>
            <button onClick={getMovies}>Søk</button>
        </main>
    )
}