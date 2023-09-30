import { ObjectId } from "mongodb"
import { insertRecord, deleteRecord, insertBatch, fetchAll, fetchBy, updateRecord, lookup} from "./mongo"
import { record } from "./interface"
import { getInscriptionFields, getInscriptionRecordBatch, getInscriptions, buildNodeGraph, getInscriptionContent } from "./utils"
import fs from "fs"
import { text } from "stream/consumers"



const inscription: record = {
    "id": "861e2d778746838f41273c301d09a8ea621f4cadfd31e953ed147d77af1d893ai0",
    "number": 34700066,
    "address": "bc1pjf80s2p3k8kcum2xcpw55y02vp9js44fhn2jq2uxl7cmkjfulxtq3dfah2",  
    "tx_id": "861e2d778746838f41273c301d09a8ea621f4cadfd31e953ed147d77af1d893a",    
    "sat_ordinal": "1941103087502042",  
    "mime_type": "text/html",
    "content_type": "text/html;charset=utf-8",  
    "timestamp": 1695824094000,  
    "recursive": true,
    "recursion_refs": ["b7aa554f495412ec111778e1328c2b189915744e8d3799ad3f4233ee97b64068i0"]
}


const inscriptionid = new ObjectId("6515070eca60c2fb32442fc8")


const inscriptionObjArray = {
    "limit": 20,
    "offset": 20,
    "total": 289610,
    "results": [
      {
        "id": "cc9227281d22ebf7b4ccf57895829e776f9cedf256b48f31553ff8c974c0af2di2",
        "number": -212138,
        "address": "bc1pltwct35mnkfdgan9heenfa3cp0046dhknen8y7y2szkt2adhqv6snxcyha",
        "genesis_address": "bc1pltwct35mnkfdgan9heenfa3cp0046dhknen8y7y2szkt2adhqv6snxcyha",
        "genesis_block_height": 809672,
        "genesis_block_hash": "00000000000000000000a744eea208313001333b916510a8e9b093382314148a",
        "genesis_tx_id": "cc9227281d22ebf7b4ccf57895829e776f9cedf256b48f31553ff8c974c0af2d",
        "genesis_fee": "35076",
        "genesis_timestamp": 1695875662000,
        "tx_id": "cc9227281d22ebf7b4ccf57895829e776f9cedf256b48f31553ff8c974c0af2d",
        "location": "cc9227281d22ebf7b4ccf57895829e776f9cedf256b48f31553ff8c974c0af2d:2:0",
        "output": "cc9227281d22ebf7b4ccf57895829e776f9cedf256b48f31553ff8c974c0af2d:2",
        "value": "546",
        "offset": "0",
        "sat_ordinal": "3330912060305",
        "sat_rarity": "common",
        "sat_coinbase_height": 666,
        "mime_type": "text/html",
        "content_type": "text/html;charset=utf-8",
        "content_length": 2291,
        "timestamp": 1695875662000,
        "curse_type": null,
        "recursive": true,
        "recursion_refs": [
          "ae43cbeba255fce630a5dced280008cfd6dd46101b56d15b62c87ccf0430c15bi0",
          "e1c6cf5ecf6011f4e9401ee34b26f0951b65f70a5d8dd549e151d2ad7fdff969i0"
        ]
      },
      {
        "id": "33c578171dc0cad900118ecb708352477a7de86e3753c51b8de06cb3fee6c2f7i2",
        "number": -212130,
        "address": "bc1pltwct35mnkfdgan9heenfa3cp0046dhknen8y7y2szkt2adhqv6snxcyha",
        "genesis_address": "bc1pltwct35mnkfdgan9heenfa3cp0046dhknen8y7y2szkt2adhqv6snxcyha",
        "genesis_block_height": 809670,
        "genesis_block_hash": "0000000000000000000465d0c320b4bf6464c60bba9550d4404cfe6a8d893c99",
        "genesis_tx_id": "33c578171dc0cad900118ecb708352477a7de86e3753c51b8de06cb3fee6c2f7",
        "genesis_fee": "68892",
        "genesis_timestamp": 1695874612000,
        "tx_id": "33c578171dc0cad900118ecb708352477a7de86e3753c51b8de06cb3fee6c2f7",
        "location": "33c578171dc0cad900118ecb708352477a7de86e3753c51b8de06cb3fee6c2f7:2:0",
        "output": "33c578171dc0cad900118ecb708352477a7de86e3753c51b8de06cb3fee6c2f7:2",
        "value": "546",
        "offset": "0",
        "sat_ordinal": "3330912060313",
        "sat_rarity": "common",
        "sat_coinbase_height": 666,
        "mime_type": "text/html",
        "content_type": "text/html;charset=utf-8",
        "content_length": 2293,
        "timestamp": 1695874612000,
        "curse_type": null,
        "recursive": true,
        "recursion_refs": [
          "ae43cbeba255fce630a5dced280008cfd6dd46101b56d15b62c87ccf0430c15bi0",
          "e1c6cf5ecf6011f4e9401ee34b26f0951b65f70a5d8dd549e151d2ad7fdff969i0"
        ]
      }]
}


const main = async() => {
    const dataArray = await getInscriptionRecordBatch(inscriptionObjArray)
    console.log(dataArray)
    const result = await insertBatch(<record[]>dataArray)
    console.log(result)
}


const getInscription = async() => {
    let i = 0
    while (true) {
        i += 50
        const data = await getInscriptions(i)
        if ( data.length  === 0) break
        console.log(data)
    }    
}


const parallel = async() => {
    const array = [];
    const function1 = async() => {
        // Append something to the array.        
        for (let i=0; i<100; i++)array.push(i+1);
    }
    const function2 = async() => {
        // Work on the elements of the array.
        for (const element of array) {
            console.log(element)
        }
    }

    const tasks = [function1(), function2()]
    await Promise.all(tasks);

}

//parallel()

const getNodeGraph = async() => { 
  const limit = 500 
  const graphData = await buildNodeGraph(limit)  
  fs.writeFileSync('./nodegraph.json', JSON.stringify(graphData))
}



const updateRecordsByContent = async() => {
  
  const contentType = ['text/plain', 'image/svg+xml', 'text/html', 'text/javascript', 'text/markdown']
  for (const content of contentType) {
    let documents = await fetchBy('mime_type', content)
    console.log(`Documents of type ${content} : ${documents.length}`)
    for ( const document of documents) {
      const contents = await getInscriptionContent(document.id)
      console.log(document.id)
      const result = await updateRecord(document.id, contents)
      console.log(result)      
    }
  }
}

const getRecordCountByContent = async() => {  
  const contentType = ['text/csv', 'text/css', 'application/json', 'application/msword, application/rtf']
  for (const content of contentType) {
    let documents = await fetchBy('mime_type', content)
    console.log(`Documents of type ${content} : ${documents.length}`)
    /*
    for ( const document of documents) {
      const contents = await getInscriptionContent(document.id)
      console.log(document.id)
      const result = await updateRecord(document.id, contents)
      console.log(result)      
    }*/
  }
}


const getRecordsByContentType = async(contentType: string) => {
  
    let documents = await fetchBy('mime_type', contentType)
    console.log(`Documents of type ${contentType} : ${documents.length}`)
    for ( const document of documents) {
      const contents = await getInscriptionContent(document.id)
      console.log(document.id)
      const result = await updateRecord(document.id, contents)
      console.log(result)      
    }
  }

  //getRecordsByContentType('model/gltf-binary')



const find = async(query: string|number) => {
  const result = await lookup(query)
  console.log(result)
}

