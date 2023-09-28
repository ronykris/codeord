import ForceGraph3D,  { ForceGraphMethods } from 'react-force-graph-3d';
import React, { useCallback, useEffect, useRef, useState } from "react";
import data from './data';

// Random data
/*
const N = 3000;
const gData = {
  nodes: [...Array(N).keys()].map((i) => ({ id: i })),
  links: [...Array(N).keys()]
    .filter((id) => id)
    .map((id) => ({
      source: id,
      target: Math.round(Math.random() * (id - 1))
    }))
};*/


export default function FocusGraph() {

    /*const [data, setData] = useState([])
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        fetch('../public/data/miserables.json').then(res => res.json()).then(sdata => {           
        console.log(sdata)
         setData(sdata)
        })   
        setTimeout(() => {
          setLoaded(true)
        }, 1000);
      }, [])*/

    const graphRef = useRef<ForceGraphMethods>();
    const handleClick = useCallback(
        (node: any) => {
            const distance = 40;
            const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
            if (graphRef.current) {
                console.log(graphRef.current);
                graphRef.current.cameraPosition(
                {
                    x: node.x * distRatio,
                    y: node.y * distRatio,
                    z: node.z * distRatio
                },
                node,
                3000
            );
            }
        },
        [graphRef]        
    );

    return (
      <>      
        <ForceGraph3D
            ref={graphRef}
            graphData={data}
            nodeLabel="id"
            //backgroundColor={"rgba(0,0,0,0)"}
            nodeAutoColorBy="group"
            nodeColor={() => "yellow"}
            linkColor={() => "white"}   
            showNavInfo={true}         
            onNodeClick={handleClick}
        />
        <div className='text-center mt-10'>
          <button className="bg-black text-yellow-500  p-4 rounded-lg w-40 mx-auto text-center text-xl">Load More            
          </button>
        </div>
      </>
        
    )
}

