// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dotenv from 'dotenv'
import { MongoClient, Db } from 'mongodb'

type Data = {
 name: string
}

dotenv.config()

const url = process.env.MONGODB!
const client = new MongoClient(url)

const lookup = async(query: string|number) => {
  try {
      await client.connect()
      const db: Db = client.db(process.env.DB)
      const collection = db.collection(process.env.COLLECTION!)     
      if (typeof query === 'number') {
          const result = await collection.find({number : query}).toArray()
          return result
      } else {
          const result = await collection.find({
              $or: [
                  {id : { $regex: query, $options: 'i' }},                    
                  {address : { $regex: query, $options: 'i' }},
                  {tx_id : { $regex: query, $options: 'i' }},
                  {sat_ordinal : { $regex: query, $options: 'i' }},
                  {mime_type : { $regex: query, $options: 'i' }},
                  {content : { $regex: query, $options: 'i' }}
              ]
          }).toArray()
          return result
      } 
          
  } catch (e) { 
      console.error(e)
  } finally {
      client.close()        
  }
}

const buildGraph = async(records: any) => {
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
  const recordsLen = records.length
  for ( let i=0; i < recordsLen; i++) {
      nodes.add({ id: records[i].id})
      for (const recursiveRef of records[i].recursion_refs) {
          links.add( { source: records[i].id, target: recursiveRef})
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


export default async function handler(req: NextApiRequest,  res: NextApiResponse) {
  const queryString = req.query.q
  try {
    const query: string|number = typeof queryString === 'string' ? queryString : Number(queryString)
    const searchResults = await lookup(query)  
    const graphData = await buildGraph(searchResults)

    res.status(200).json({searchResults: searchResults, graphData: graphData})
  } catch (err) { 
    res.status(400).json(err)
  }
}
