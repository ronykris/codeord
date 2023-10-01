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
        <div className="grid grid-cols-5 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-center rounded bg-white aspect-square opacity-60 p-10 shadow-2xl mx-auto">
        <div className="col-span-5 flex flex-col items-center justify-center max-h-96 max-w-[200px] rounded-[15px] overflow-auto">
          <h3 className="text-6xl text-black opacity-60 font-bold mb-3 capitalize">{number}</h3>  
          <div className="relative min-h-[100px] max-h-[200px] max-w-[200px] overflow-auto rounded-[15px] p-2 overflow-x-auto">
            <p className="whitespace-pre-wrap break-words overflow-hidden max-w-[200px]">
              <span>{content}</span>
            </p>
          </div>
        </div>
      </div>
      
      

      

    )
}

export default InscriptionCard