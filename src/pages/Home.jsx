import { useEffect, useState } from "react"
import SearchResults from "../components/SearchResults"
import History from "../components/History"

export default function Home() 
{
    const apiKey = import.meta.env.VITE_APP_API_KEY

    const [search, setSearch] = useState()
    const [apiData, setApiData] = useState()
    /*Variabel som lagrer verdiene i localStorage.*/
    const storedHistory = localStorage.getItem("search")
    /*Default verdi til 'history' er verdiene i 'storedHistory' hvis det fins verdier der.
      'JSON.parse' konverterer en JSON string til et JavaScript objekt.*/
    const [history, setHistory] = useState(storedHistory ? JSON.parse(storedHistory) : [])
    const [focused, setFocused] = useState(false)

    console.log("Home_storedHistory", storedHistory)

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
        console.log("Home_e.target.value: ", e.target.value)
        console.log("Home_e.target.value.length: ", e.target.value.length)
    }

    {/*Oppdaterer filmvisning så fort nye karakterer er skrevet i søkefeltet.*/}
    useEffect(() => 
    {
        getMovies()
    }, [search])

    const handleSubmit = (e) => 
    {
        e.preventDefault()
        e.target.reset()

        /*'history' beholder tidligere verdier + den nye søkeverdien.*/
        setHistory((prev) => [...prev, search])
    }

    useEffect(() => 
    {
        /*localStorage får en ny verdi så fort history oppdaterer seg.
          'JSON.stringify' konverterer et JavaScript objekt til en JSON string.*/
        localStorage.setItem("search", JSON.stringify(history))
    }, [history])
    console.log("Home_history", history)

    /*Tømmer localStorage for nøkkel-verdipar.*/
    function deleteLocalStorage()
    {
        localStorage.clear()
    }

    return (
        <main>
            <h1>Forside</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Søk etter film:
                    <input type="search" name="movie_title_input" placeholder="Harry Potter" onChange={handleChange} onFocus={() => setFocused(true)} /*onBlur={() => setFocused(false)}*/></input>
                </label>
                {
                focused 
                ?
                    <History history={history} setSearch={setSearch} />
                :
                    null
                }
                <button onClick={getMovies}>Søk</button>
            </form>
            <form onSubmit={deleteLocalStorage}>
                <button>Slett localStorage</button>
            </form>
            <SearchResults apiData={apiData} />
        </main>
    )
}
