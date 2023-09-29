import { record } from "./interface"
import axios from "axios"
import { insertBatch, fetchAll, fetchBy } from "./mongo"

export const getInscriptionFields = async(obj: any): Promise<Record<string, any>> => {
    const interestedFields: string[] = [
        "id",
        "number",
        "address",    
        "tx_id",    
        "sat_ordinal",  
        "mime_type",
        "content_type",    
        "timestamp",  
        "recursive",
        "recursion_refs"
    ]
    const inscriptionData: Record<string, any> = {}
    for (const field of interestedFields) {
        if (obj.hasOwnProperty(field)) {
            inscriptionData[field] = obj[field]
        }
    }
    return inscriptionData
}

export const getInscriptionRecordBatch = async(batchObj: Record<string, any>): Promise<Record<string, any>[]>  => {
    const inscriptionDataArray: Record<string, any>[] = []  
    const batchObjLen = batchObj.results.length  
    for (let i=0; i < batchObjLen; i++) {        
        let inscriptionData = await getInscriptionFields(batchObj.results[i])        
        inscriptionDataArray.push(inscriptionData)
    }    
    return inscriptionDataArray
}

const url = 'https://api.hiro.so/ordinals/v1/inscriptions?recursive=true'

export const getInscriptions = async(offset: number): Promise<Record<string, any>> => {
    
    const limit = 50
    const params = new URLSearchParams()

    params.append('offset', offset.toString())
    params.append('limit', limit.toString())
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${url}&${params}`,
        headers: { 
          'Accept': 'application/json'
        }
    };  
    try {
        const response = await axios.request(config)
        const inscriptions = await response.data
        //console.log(inscriptions)
        return inscriptions
    } catch (e) {
        console.error(e)
    }    
}

export const buildNodeGraph = async(limit: number) => {
    const documents = await fetchAll(limit)

    interface Node {
        id: string;
        //group: number;
    }

    interface Link {
        source: string;
        target: string;
    }

    const links: Set<Link> = new Set()
    const nodes: Set<Node> = new Set()
    const documentsLen = documents.length
    for ( let i=0; i < documentsLen; i++) {
        nodes.add({ id: documents[i].id})
        for (const recursiveRef of documents[i].recursion_refs) {
            links.add( { source: documents[i].id, target: recursiveRef})
            nodes.add({ id: recursiveRef})
        }
    }

    const graphNodes = {
        nodes: Array.from(nodes),
        links: Array.from(links)
    }
    console.log(graphNodes)
    return graphNodes
}

export const getInscriptionContent = async(id: string) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://api.hiro.so/ordinals/v1/inscriptions/${id}/content`,
        headers: { 
            'Accept': 'application/json'
        }
    };
    try {
        const response = await axios.request(config)
        const content = await response.data
        console.log(content)
        return content
    } catch (err) { 
        console.error(err)
    }
}