import ResultsChart from "./ResultsGraphWrapper"
import Inscriptions from "./Inscriptions"

const SearchResults = ({data}) => {
    console.log(data)
    return (
        <div className="flex flex-col">
            <ResultsChart nodes={data.graphData}/>
            <Inscriptions results={data.searchResults} />
        </div>
    )
}

export default SearchResults