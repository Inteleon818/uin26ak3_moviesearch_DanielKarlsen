import { Link } from "react-router-dom"

{/*Representerer filmer på forsiden, hver film på forsiden har en lenke til en dynamisk slug side 
   som viser informasjon om filmen.*/}
export default function MovieCard({image, title, releaseYear}) 
{
    return (
        <article>
            <img src={image} alt={title}></img>
            <Link to={title}><h3>{title}</h3></Link>
            <p>{releaseYear}</p>
        </article>
    )
} 