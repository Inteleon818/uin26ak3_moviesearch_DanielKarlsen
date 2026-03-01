import { useParams } from "react-router-dom"

{/*Film slug sider for når man klikker på en filmlenke på forsiden.*/}
export default function Movie() 
{
    const {movie} = useParams()
    console.log("movie_slug: ", movie)

    return (
        <h1>{movie}</h1>
    )
} 