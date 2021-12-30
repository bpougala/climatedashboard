import { initializeApp } from 'firebase/app';
import { FirebaseStorage, getStorage, ref, getDownloadURL } from 'firebase/storage';
import {  } from 'csv-parser';
import * as csvParser from "csv-parser";
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
            csvParser([""])
            const sep : string[] = blob.split("");
            console.log(sep);
        }
    };
    xhr.open('GET', url);
    xhr.send();
})
.catch((error) => {
    console.error(error);
})