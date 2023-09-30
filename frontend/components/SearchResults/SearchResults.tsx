import ResultsChart from "./ResultsGraphWrapper"
import Inscriptions from "./Inscriptions"
import { NextPage } from "next"

interface node {
    id: string
}
interface link {
    source: string,
    target: string
}
interface record {
    "_id": Object
    "id": string,
    "number": number,
    "address": string,    
    "tx_id": string,    
    "sat_ordinal": string,  
    "mime_type": string,
    "content_type": string,    
    "timestamp": number,  
    "recursive": boolean,
    "recursion_refs": string[],
    "content": string
}

interface SearchResultProps {
    graphData: {nodes: node[], links: link[]},
    searchResults: record[]
}


const SearchResults: React.FC<SearchResultProps>  = ({graphData, searchResults}) => {
    console.log(graphData)
    console.log(searchResults)
    return (
        <div className="flex flex-col">
            <ResultsChart graphData={graphData}/>
            <Inscriptions searchResults={searchResults} />
        </div>
    )
}

export default SearchResults