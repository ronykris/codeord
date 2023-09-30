import ForceGraph3D,  { ForceGraphMethods, GraphData } from 'react-force-graph-3d';
import React, { useCallback, useEffect, useRef, useState } from "react";

interface node {
  id: string
}
interface link {
  source: string,
  target: string
}

interface ChildGraphData {
  graphData: {nodes: node[], links: link[]},
}

const ResultsChart: React.FC<ChildGraphData> = ({graphData}) => {
        
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
      <div className='mx-auto overflow-hidden my-4 border border-gray-800 rounded-lg'>
        <ForceGraph3D
            ref={graphRef}
            graphData={graphData}
            nodeLabel="id"     
            width={640}
            height={640}       
            //backgroundColor={"rgba(0,0,0,0)"}            
            nodeAutoColorBy="group"
            nodeColor={() => "yellow"}
            linkColor={() => "white"}               
            onNodeClick={handleClick}
        />
      </div>
    )
}

export default ResultsChart

