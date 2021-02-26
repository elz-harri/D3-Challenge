// Set up width, height and margins of graphs

let svgWidth = 900;
let svgHeight = svgWidth - svgWidth / 4;

let chartMargin = {
    top:20,
    bottom: 80,
    right:40,
    left: 100,
}

// Define dims for chart area by adjusting

let chartWidth = svgWidth - chartMargin.left - chartMargin.right;
let chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions

let svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

const chartGroup = svg
  .append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

 // Import and read data from CSV

d3.csv("./assets/data/data.csv", rowConverter)
    .then(makeChart)
