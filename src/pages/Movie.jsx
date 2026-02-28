import { Link, useParams } from "react-router-dom"

export default function Movie({image, title, releaseYear}) 
{
    const {movie} = useParams()
    console.log("movie_slug: ", movie)

    return (
        <article>
            <img src={image} alt={title}></img>
            <Link to={title}><h3>{title}</h3></Link>
            <p>{releaseYear}</p>
        </article>
    )
} 