import { initializeApp } from 'firebase/app';
import { FirebaseStorage, getStorage, ref, getDownloadURL } from 'firebase/storage';
import * as d3 from 'd3';

const firebaseConfig = {
    apiKey: "AIzaSyDmIGZPEvy6nxDQyRw3o_JM2d9288p_fFU",
    authDomain: "climatedashboard-f0be5.firebaseapp.com",
    projectId: "climatedashboard-f0be5",
    storageBucket: "climatedashboard-f0be5.appspot.com",
    messagingSenderId: "439378006530",
    appId: "1:439378006530:web:f584497ad304df338b4d1b"
};
const app = initializeApp(firebaseConfig);
const storage : FirebaseStorage = getStorage(app);
const margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
let xNudge = 50;
let yNudge = 20;

getDownloadURL(ref(storage, 'co2_annmean_mlo.csv'))
.then((url) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "text";
    xhr.onload = (event) => {
        if(xhr.readyState === 4) {
            const blob : string = xhr.response;
            const arr = CSVtoArray(blob);
            var svg = d3.select("#co2_visualisation")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            const multiDimArray = d3.csvParseRows(arr)
            const maxYear : number = d3.max(multiDimArray.slice(1), function(line) { return parseInt(line[0])});
            const minYear : number = d3.min(multiDimArray.slice(1), function(line) { return parseInt(line[0])});
            const maxCarbon : number = d3.max(multiDimArray.slice(1), function(line) { return parseInt(line[1])});
            const minCarbon : number = d3.min(multiDimArray.slice(1), function(line) { return parseInt(line[1])});
            const y = d3.scaleLinear().domain([minCarbon, maxCarbon])
                .range([height, 0]);

            const x = d3.scaleLinear().domain([minYear, maxYear])
                .range([0, width]);

            const yAxis = d3.axisLeft(y);
            const xAxis = d3.axisRight(x);
            const line = d3.line()
                .x(function(elem) { return elem[0]; })
                .y(function(elem) { return elem[1]; })
                .curve(d3.curveCardinal);

            const rows = multiDimArray.slice(1).map(flattenArray);
            svg.append('g')
                .selectAll('dot')
                .data(rows)
        }
    };
    xhr.open('GET', url);
    xhr.send();
})
.catch((error) => {
    console.error(error);
})

function flattenArray(subArray : Array<string>) {
    const trimArray = subArray.slice(0, 1);
    return trimArray.map(elem => parseInt(elem));
}
function CSVtoArray(rawText : string) {
    const regex = /^[^#].*/;
    const temp : Array<string> = rawText.split("\n");
    const final: Array<string> = [];
    for (let line in temp) {
        const currentLine : string = temp[line];
        if(regex.test(currentLine)) {
            final.push(currentLine);
        }
    }
    if (final.length === 0) return null;
    return final.join("\n");
}
