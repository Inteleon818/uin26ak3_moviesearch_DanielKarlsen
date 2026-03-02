export default function History({history, setSearch}) 
{
    const handleChange = (e) => 
    {
        setSearch(e.target.value)
    }

    return (
        <select onChange={handleChange}>
            {history?.map((item, index) => <option key={index} value={item}>{item}</option>)}
        </select>
    )
} 