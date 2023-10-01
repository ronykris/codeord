import React, { use, useState } from "react";

interface node {
  id: string
}
interface link {
  source: string,
  target: string
}
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

interface ChildProps {
  graphData: {nodes: node[], links: link[]},
  searchResults: record[]
}
interface SearchChildProps {
  getCompData: (comp: number, data: ChildProps) => void
}

const Searchbox: React.FC<SearchChildProps> = ({ getCompData }) => {
  const [query, setQuery] = useState("")    
  
  const handleSubmit = async(e: any, query:string) => {
    e.preventDefault()
    if(!query.trim()) return
    const response = await fetch(`/api/search?q=${query}`)
    const data: ChildProps = await response.json()
    //console.log(data)    
    if (data.searchResults.length !== 0) {
      getCompData(1, data)
    } else {
      getCompData(2, data)
    }
    
  }
  return (
    <div className="w-2/3 mx-auto">
    <form
      onSubmit={(e) => handleSubmit(e, query)}
      className="bg-white rounded-full shadow-md p-2 pr-5 m-2 mb-5 sticky flex items-center justify-between"
    >
      <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
        <svg
          className="h-6 w-6  text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
  
      <input
        className="font-sans font-bold uppercase rounded-full w-full py-2 pl-4 pr-10 text-gray-700 leading-tight mr-3 focus:outline-none focus:shadow-outline text-m"
        type="text"
        placeholder="Search"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
  
      <div className="bg-blue-400 p-2 hover:bg-blue-500 cursor-pointer rounded-full">
        <svg
          className="w-6 h-6 text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </form>
  </div>
  )
}

export default Searchbox
