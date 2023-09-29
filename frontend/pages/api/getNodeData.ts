// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dotenv from 'dotenv'
import { MongoClient, Db } from 'mongodb'

dotenv.config()

const url = process.env.MONGODB!
const client = new MongoClient(url)

const fetchAll = async(limit: number) => {
  try {
      await client.connect()
      const db: Db = client.db(process.env.DB)
      const collection = db.collection(process.env.COLLECTION!)
      const documents = await collection.find({}).limit(limit).toArray()
      return documents
  } catch (e) { 
      console.error(e)
  } finally {
      client.close()
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
  const documentsLen = documents!.length
  for ( let i=0; i < documentsLen; i++) {
      nodes.add({ id: documents![i].id})
      for (const recursiveRef of documents![i].recursion_refs) {
          links.add( { source: documents![i].id, target: recursiveRef})
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {  
  const query = req.query.limit
  try {
    const graphData = await buildNodeGraph(Number(query))  
    res.status(200).json(graphData)
  } catch (err) { 
    res.status(400).json(err)
  }
  
}
