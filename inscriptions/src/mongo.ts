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

export const fetchBy = async(parameter: string, value: string|any) => {
    try {
        await client.connect()
        const db: Db = client.db(process.env.DB)
        const collection = db.collection(process.env.COLLECTION!)
        const query = {[parameter]: value}
        const documents = await collection.find(query).toArray()
        return documents
    } catch (e) { 
        console.error(e)
    }   
}

export const connectToDb = async() => {
    try {
        await client.connect()
        const db: Db = client.db(process.env.DB)
        const collection = db.collection(process.env.COLLECTION!)
        return collection
    } catch (e) {
        console.error(e)
    }
}

export const updateRecord = async(id: string, contentValue: string|any) => {
    try {
        const collection = await connectToDb()
        const filter = { id: id}
        const update = {
            $set: {
                content: contentValue,
            }
        }
        const result = await collection.updateOne(filter, update)        
        console.log(result)
    } catch (e) { 
        console.error(e)
    }
}

export const lookup = async(query: string|number) => {
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


