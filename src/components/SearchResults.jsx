import MovieCard from "./MovieCard";

{/*Inneholder filmer som vises etter søking.*/}
export default function SearchResults({apiData}) 
{
    return (
        <section>
            {/*Oppretter dynamiske filmkomponenter om hver film som dukker opp i listen etter søk.*/}
            {/*'404' meldinger dukker opp på konsollen hvis bildet ikke finnes.*/}
            {apiData?.data?.Search?.map((item, index) => <MovieCard key={item?.Title+"_"+index+"_key"} image={item?.Poster} title={item?.Title} releaseYear={item?.Year} />)} 
        </section>
    )
} 