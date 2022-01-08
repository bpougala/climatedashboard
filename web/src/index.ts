import { initializeApp } from 'firebase/app';
import { FirebaseStorage, getStorage, ref, getDownloadURL } from 'firebase/storage';
import { csvParseRows } from "d3";
import { drawPlot } from './plots'

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


getDownloadURL(ref(storage, 'co2_annmean_mlo.csv'))
.then((url) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "text";
    xhr.onload = (event) => {
        if(xhr.readyState === 4) {
            const blob : string = xhr.response;
            const arr = CSVtoArray(blob);
            const multiDimArray = csvParseRows(arr);
            drawPlot("#co2_visualisation", multiDimArray);

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
