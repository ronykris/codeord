import dotenv from 'dotenv'
import { MongoClient, Db, ObjectId } from 'mongodb'
import { record } from './interface'

dotenv.config()

const url = process.env.MONGODB!
const client = new MongoClient(url)


export const insertRecord = async(inscription: record) => {    
    try {
        await client.connect()
        const db: Db = client.db(process.env.DB)
        const collection = db.collection(process.env.COLLECTION!)
        const result = await collection.insertOne(inscription)
        console.log(result)
    } catch (e) {
        console.error(e)
    } finally {
        client.close()        
    }
}

export const deleteRecord = async(inscriptionId: ObjectId) => {
    try {
        await client.connect()
        const db: Db = client.db(process.env.DB)
        const collection = db.collection(process.env.COLLECTION!)
        const result = await collection.deleteOne({ _id: inscriptionId})
        console.log(result)
    } catch (e) {
        console.error(e)
    } finally {
        client.close()
    }   
}

export const insertBatch = async(inscriptionRecords: record[]) => {    
    try {
        await client.connect()
        const db: Db = client.db(process.env.DB)
        const collection = db.collection(process.env.COLLECTION!)
        const result = await collection.insertMany(inscriptionRecords)
        console.log(result)
    } catch (e) {
        console.error(e)
    }
}

export const fetchAll = async(limit: number) => {
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
