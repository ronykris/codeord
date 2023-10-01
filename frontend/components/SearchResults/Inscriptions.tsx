import InscriptionCard from "./InscriptionCard"

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

interface InscriptionsProps {    
    searchResults: record[]
}

const Inscriptions: React.FC<InscriptionsProps> = ({searchResults}) => {
    console.log(searchResults)
    return (
        //<div className="grid auto-rows-auto grid-cols-3 gap-12 mx-auto">
          <div className="m-5">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            { searchResults.map((result, index) => (
                <li key={index}>
                    <div className="bg-white rounded shadow p-4">
                    <InscriptionCard 
                        _id={result._id} 
                        id={result.id}
                        number={result.number}
                        address={result.address}
                        tx_id={result.tx_id}
                        sat_ordinal={result.sat_ordinal}
                        mime_type={result.mime_type}
                        content_type={result.content_type}
                        timestamp={result.timestamp}
                        recursive={result.recursive}
                        recursion_refs={result.recursion_refs}
                        content={result.content}
                    />
                    </div>
                </li>
            )
               
            )}
            </ul>
                        
            
                 
              
        </div>
    )
}

export default Inscriptions