import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "./SearchPage.css";

const SearchPage =()=>{
    const [query,setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSearch  = async()=>{
        if(!query.trim()) return;
        setIsLoading(true);
        setError('');
        try{
            const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${query}`);
            if(response.data.drugGroup.conceptGroup){
                setResults(response.data.drugGroup.conceptGroup.flatMap(group  => group.conceptProperties));
            }else{
                const suggestions = await axios.get(`https://rxnav.nlm.nih.gov/REST/spellingsuggestions.json?name=${query}`);
                if(suggestions.data.suggestionGroup.suggestionList.suggestion){
                    setResults(suggestions.data.suggestionGroup.suggestionList.suggestion.map(s =>({name:s})));

                }else{
                    setError("No results found");
                    setResults([]);
                }
            }
        }catch(error){
            console.log(error);
            setError('An error occured while searching');
            setResults([])
        }
        finally{
            setIsLoading(false);
        }
    };

    const handleResultClick =(name) =>{
        const encodeName = encodeURIComponent(name);
        navigate(`/drugs/${encodeName}`);
    };





    return(
        <div className ="search-page"> 
            <h1 className="search-title">Search for Drugs</h1>
            <div className = "search-container">
                <input 
                type = "text"
                value={query}
                onChange={(e)=> setQuery(e.target.value)}
                placeholder = "Enter Drug Name"
                className ="search-input"
                />
                <button onClick = {handleSearch} className ="search-button" disabled={isLoading}>
                    {isLoading ? "searching.." : "search"}
                </button>
            </div>
                {error && <p className="error-message">{error}</p>}
                {results.length > 0 && (
                 <ul className="results-list">
                        {results.map((result, index)=> 
                        <li 
                            key = {index}
                            onClick={()=>handleResultClick(result.name)}
                            className="result-item"
                        >
                            {result.name}
                        </li>
                        )}
                    </ul>
                )}    
            
        </div>
    )
}
export default SearchPage;