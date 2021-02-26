let svgWidth = 1000;
let svgHeight = 600;

let margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

let width = svgWidth - margin.left - margin.right;
let height = svgHeight - margin.top - margin.bottom;


let svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);


let chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


d3.csv("/assets/data/data.csv").then(function(myData) {
    
    
    myData.forEach(function(xdata) {
        xdata.poverty = +xdata.poverty;
        xdata.healthcare = +xdata.healthcare;
    });

    
    let xLinScale = d3.scaleLinear()
        .domain([d3.min(myData, d=>d.poverty)*0.9, 
            d3.max(myData, d => d.poverty)*1.1])
        .range([0, width]);

    
    let yLinScale = d3.scaleLinear()
        .domain([0, d3.max(myData, d => d.healthcare)*1.1])
        .range([height, 0]);

    
    let bottomAxis = d3.axisBottom(xLinScale);
    let leftAxis = d3.axisLeft(yLinScale);

    
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .style("font-size", "16px")
        .call(bottomAxis);

    
    chartGroup.append("g")
        .style("font-size", "16px")
        .call(leftAxis);
  
    // Create circles
    chartGroup.selectAll("circle")
        .data(myData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinScale(d.poverty))
        .attr("cy", d => yLinScale(d.healthcare))
        .attr("r", 15)
        .attr("fill", "salmon")
        .attr("opacity", ".3");

    // Add text to circles
    chartGroup.selectAll("text.text-circles")
        .data(myData)
        .enter()
        .append("text")
        .text(d => d.abbr)
        .attr("x", d => xLinScale(d.poverty))
        .attr("y", d => yLinScale(d.healthcare))
        .attr("dy",5)
        .attr("text-anchor","middle")
        .attr("font-size","10px");

    // Create Y-axis
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 40 - margin.left)
        .attr("x", 0 - (height / 1.5))
        .text("Lacking Healthcare (%)")
        .attr("font-size", "20px")
        .style("font-weight", "bold");
        

    // Create X-axis
    chartGroup.append("text")
        .attr("y", height + margin.bottom/1.25)
        .attr("x", width / 2.5)
        .text("Poverty Rate (%)")
        .attr("font-size", "20px")
        .style("font-weight", "bold");    

});