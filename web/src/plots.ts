import * as d3 from 'd3';

const margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
let xNudge = 50;
let yNudge = 20;

export function drawPlot(selector : string, multiDimArray : string[][]) {
    const maxYear : number = d3.max(multiDimArray.slice(1), function(line) { return parseInt(line[0])});
    const minYear : number = d3.min(multiDimArray.slice(1), function(line) { return parseInt(line[0])});
    const maxCarbon : number = d3.max(multiDimArray.slice(1), function(line) { return parseInt(line[1])});
    const minCarbon : number = d3.min(multiDimArray.slice(1), function(line) { return parseInt(line[1])});
    const y = d3.scaleLinear().domain([minCarbon, maxCarbon])
        .range([height, 0]);

    const x = d3.scaleLinear().domain([minYear, maxYear])
        .range([0, width]);

    const yAxis = d3.axisLeft(y);
    const xAxis = d3.axisBottom(x);
    const line = d3.line()
        .x(function(elem) { return elem[0]; })
        .y(function(elem) { return elem[1]; })
        .curve(d3.curveCardinal);

    const rows = multiDimArray.slice(1).map(flattenArray);
    const svg = d3.select(selector)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.top + "," + margin.bottom + ")")
        .call(xAxis);
}

function flattenArray(subArray : Array<string>) {
    const trimArray = subArray.slice(0, 1);
    return trimArray.map(elem => parseInt(elem));
}