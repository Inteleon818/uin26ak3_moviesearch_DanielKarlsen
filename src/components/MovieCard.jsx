import '../styles/MovieCard.css'
import { Link } from "react-router-dom"

{/*Representerer filmer på forsiden, hver film på forsiden har en lenke til en dynamisk slug side 
   som viser informasjon om filmen.*/}
export default function MovieCard({image, title, releaseYear}) 
{
    /*Formaterer tittel-strengen slik at lenken fremdeles fungerer selv om tittelen på filmen har kolon i navnet.*/
    const titleRegex = /[:]/
    const formattedTitle = title.replace(titleRegex, "")

    return (
        <article>
            {/*Takk til Tina Kringen for å hjelpe meg med behandling av manglende bilder i api-kall.*/}
            {/*Kilde til placeholder bilde: https://fontawesome.com/icons/clapperboard?f=classic&s=solid*/}
            <img src={image} alt={title} onError={(e) => {e.target.src = "../clapperboard-solid.png"}}></img>
            <Link to={formattedTitle}><h3>{title}</h3></Link>
            <p>{releaseYear}</p>
        </article>
    )
}