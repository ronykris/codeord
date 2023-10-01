import ForceGraph3D,  { ForceGraphMethods, GraphData } from 'react-force-graph-3d';
import React, { useCallback, useEffect, useRef, useState } from "react";


export default function FocusGraph() {

    const [data , setData] = useState<GraphData & any>()
    const [loaded, setLoaded] = useState(false)

    const fetchNodes = async(limit: number) => {      
      const res = await fetch(`/api/getNodeData?limit=${limit}`)
      const sdata = await res.json()
      //console.log(sdata)
      setData(sdata)  
      //console.log(data)
      //gData = data
    }
    useEffect(() => {   
      fetchNodes(5000)                    
        setTimeout(() => {          
          setLoaded(true)
        }, 1000);
    }, [])

    const graphRef = useRef<ForceGraphMethods>();
    const handleClick = useCallback(
        (node: any) => {
          const distance = 40;
          const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
          if (graphRef.current) {
            graphRef.current.cameraPosition(
              {
                x: node.x * distRatio,
                y: node.y * distRatio,
                z: node.z * distRatio,
              },
              node,
              1000
            );
      
            const nodeURL = `https://ordinals.com/inscription/${node.id}`;
            console.log("Node URL:", nodeURL);
            window.open(nodeURL, '_blank');
            }
        },
        [graphRef]        
    );

    return (
      <>      
      {loaded && 
      <div className='w-full h-full mx-auto overflow-hidden my-4 border border-gray-800 rounded-lg'>
        <ForceGraph3D
            ref={graphRef}
            graphData={data}
            nodeLabel="id"            
            //backgroundColor={"rgba(0,0,0,0)"}            
            nodeAutoColorBy="group"
            nodeColor={() => "yellow"}
            linkColor={() => "white"}               
            onNodeClick={handleClick}
            linkWidth={10}
        />
      </div>
      }
       {/*

        <div className='text-center mt-10'>
          <button className="bg-white  text-gray-700  opacity-70  p-4 rounded-lg w-40 mx-auto text-center text-xl">Load More            
          </button>
    </div>*/}
      </>
        
    )
}

