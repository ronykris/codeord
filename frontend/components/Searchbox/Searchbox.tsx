import Image from "next/image";
import {AiOutlineSearch} from "react-icons/ai"
import React, { use, useState } from "react";

const Searchbox = ({ getCompData }) => {
  const [query, setQuery] = useState("")    
  
  const handleSubmit = async(e: any, query:string) => {
    e.preventDefault()
    if(!query.trim()) return
    const response = await fetch(`/api/search?q=${query}`)
    const data = await response.json()
    //console.log(data)    
    if (data.searchResults.length !== 0) {
      getCompData(1, data)
    } else {
      getCompData(2, data)
    }
    
  }
  return (
      <form onSubmit={ (e) => handleSubmit(e, query)} className="bg-white opacity-70 items-center justify-between mx-auto max-w-3xl flex rounded-full shadow-lg p-2 m-2 mb-5 sticky">
        <div>
          <div className="p-2 mr-1 rounded-full hover:bg-gray-100 cursor-pointer">
            <svg className="h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        
          <input className="font-bold uppercase rounded-full w-full py-4 pl-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs" 
                  type="text" 
                  placeholder="Search" 
                  onChange={(e) => setQuery(e.target.value)}
                  value={query}
                  />
            <div className="bg-gray-600 p-2 hover:bg-blue-400 cursor-pointer mx-2 rounded-full">
              <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>                
      </form>
  )
}

export default Searchbox
