package main

import (
	"climatedashboard.co/datasets"
	"log"
)

func main() {
	app, err := datasets.ConnectToFirebase()
	if err != nil { log.Fatal(err) }
	body, err := datasets.DownloadFile("https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_annmean_mlo.csv")
	err = datasets.UploadToGoogleCloud(app, body, "co2_annmean_mlo.csv", "co2_annmean_mlo.csv")
	if err != nil {
		log.Fatal(err)
	}
}
