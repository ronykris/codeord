import dynamic from "next/dynamic";

const ResultsChart = dynamic(() => import("./ResultsChart"), {
  ssr: false
});

export default ResultsChart;