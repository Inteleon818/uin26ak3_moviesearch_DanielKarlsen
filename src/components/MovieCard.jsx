import '../styles/MovieCard.css'
import { Link } from "react-router-dom"

{/*Representerer filmer på forsiden, hver film på forsiden har en lenke til en dynamisk slug side 
   som viser informasjon om filmen.*/}
export default function MovieCard({image, title, releaseYear}) 
{
    /*https://share.google/aimode/5dww4bJp5dg7eyCLl*/
    /*Forsøk på å håndtere 404 errors*/
    /*
    fetch(image).then(response => 
    {
        if (!response.ok) 
        {
            image = "some-default-image"
        }
    })
    */

    /*Formaterer tittel-strengen slik at lenken fremdeles fungerer selv om tittelen på filmen har kolon i navnet.*/
    const titleRegex = /[:]/
    const formattedTitle = title.replace(titleRegex, "")

    return (
        <article>
            <img src={image} alt={title}></img>
            <Link to={formattedTitle}><h3>{title}</h3></Link>
            <p>{releaseYear}</p>
        </article>
    )
} 