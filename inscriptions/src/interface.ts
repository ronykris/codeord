export interface record {
    "id": string,
    "number": number,
    "address": string,    
    "tx_id": string,    
    "sat_ordinal": string,  
    "mime_type": string,
    "content_type": string,    
    "timestamp": number,  
    "recursive": boolean,
    "recursion_refs": string[]
}