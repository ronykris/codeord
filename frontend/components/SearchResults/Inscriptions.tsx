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
        <div className="grid auto-rows-auto grid-cols-3 gap-12 mx-auto">
            <ul>
            { searchResults.map((result, index) => (
                <li key={index}>
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
                </li>
            )
               
            )}
            </ul>
                        
            
                 
              
        </div>
    )
}

export default Inscriptions