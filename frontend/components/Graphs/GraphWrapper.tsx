import dynamic from "next/dynamic";

const FocusGraph = dynamic(() => import("./NodeChart"), {
  ssr: false
});

export default FocusGraph;