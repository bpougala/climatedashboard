import { initializeApp } from 'firebase/app';
import { FirebaseStorage, getStorage, ref, getDownloadURL } from 'firebase/storage';
import { csvParseRows, select, max, min } from 'd3';

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
getDownloadURL(ref(storage, 'co2_annmean_mlo.csv'))
.then((url) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "text";
    xhr.onload = (event) => {
        if(xhr.readyState === 4) {
            const blob : string = xhr.response;
            const arr = CSVtoArray(blob);
            var svg = select("#co2_visualisation")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            const multiDimArray = csvParseRows(arr)
            const maxYear : number = max(multiDimArray.slice(1), function(line) { return parseInt(line[0])});
            const minYear : number = min(multiDimArray.slice(1), function(line) { return parseInt(line[0])});
            const maxCarbon : number = max(multiDimArray.slice(1), function(line) { return parseInt(line[1])});
            const minCarbon : number = min(multiDimArray.slice(1), function(line) { return parseInt(line[1])});
            console.log("maxYear: " + maxYear);
            console.log("minYear: " + minYear);
            console.log("maxCarbon: " + maxCarbon);
            console.log("minCarbon: " + minCarbon);
        }
    };
    xhr.open('GET', url);
    xhr.send();
})
.catch((error) => {
    console.error(error);
})

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
