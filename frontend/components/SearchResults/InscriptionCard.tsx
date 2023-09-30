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

interface ChildSearchResults {    
    searchResults: record[]
}



const InscriptionCard: React.FC<record> = ({
    _id, 
    id, 
    number, 
    address,    
    tx_id,    
    sat_ordinal,  
    mime_type,
    content_type,    
    timestamp,  
    recursive,
    recursion_refs,
    content}) => {
    //console.log(inscriptionData)
    return (
        <div className="flex flex-col items-center justify-center rounded bg-white aspect-square opacity-60 p-10 shadow-2xl mx-auto">
            <h3 className="text-6xl text-black opacity-60 font-bold capitalize">{number}</h3>  
            <div className="relative min-h-[100px] grow overflow-hidden rounded-[15px]">
                <p className="max-h-full max-w-full whitespace-pre-wrap break-words overflow-hidden">
                    <span>{content}</span>
                </p>

            </div>

        </div>
    )
}

export default InscriptionCard