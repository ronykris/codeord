import ForceGraph3D,  { ForceGraphMethods } from 'react-force-graph-3d';
import React, { useCallback, useRef } from "react";

// Random data
const N = 3000;
const gData = {
  nodes: [...Array(N).keys()].map((i) => ({ id: i })),
  links: [...Array(N).keys()]
    .filter((id) => id)
    .map((id) => ({
      source: id,
      target: Math.round(Math.random() * (id - 1))
    }))
};

export default function FocusGraph() {
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
        <ForceGraph3D
            ref={graphRef}
            graphData={gData}
            nodeLabel="id"
            backgroundColor={"rgba(0,0,0,0)"}
            nodeAutoColorBy="group"
            nodeColor={() => "red"}
            linkColor={() => "blue"}
            onNodeClick={handleClick}
        />
    )
}
