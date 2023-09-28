import { insertBatch } from "./mongo"
import { record } from "./interface"
import { getInscriptionRecordBatch, getInscriptions} from "./utils"



const main = async() => {
    //Fetch inscriptions
    let i = 0 //offset
    while (true) {      
        const inscriptions = await getInscriptions(i)
        if ( !inscriptions ) break
        console.log(`Fetched inscription offset: ${i}...`)
        const extractedObj = await getInscriptionRecordBatch(inscriptions)
        const result = await insertBatch(<record[]>extractedObj)        
        i += 50
    }    
}

main()



