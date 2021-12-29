package main

import (
	"climatedashboard.co/datasets"
	"log"
)

func main() {
	app, err := datasets.ConnectToFirebase()
	if err != nil {
		log.Fatal(err)
	}
	body, err := datasets.DownloadFile("https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_annmean_mlo.csv")
	err = datasets.UploadToGoogleCloud(app, body, "co2_annmean_mlo.csv", "co2_annmean_mlo.csv")
	if err != nil {
		log.Fatal(err)
	}
	body, err = datasets.DownloadFile("https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_mm_mlo.csv")
	if err != nil {
		log.Fatal(err)
	}
	err = datasets.UploadToGoogleCloud(app, body, "co2_mm_mlo.csv", "co2_mm_mlo.csv")
	if err != nil {
		log.Fatal(err)
	}
	body, err = datasets.DownloadFile("https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_annmean_mlo.csv")
	if err != nil {
		log.Fatal(err)
	}
	err = datasets.UploadToGoogleCloud(app, body, "co2_annmean_mlo.csv", "co2_annmean_mlo.csv")
	if err != nil {
		log.Fatal(err)
	}
	body, err = datasets.DownloadFile("https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_gr_mlo.csv")
	if err != nil {
		log.Fatal(err)
	}
	err = datasets.UploadToGoogleCloud(app, body, "co2_gr_mlo.csv", "co2_gr_mlo.csv")
	if err != nil {
		log.Fatal(err)
	}
	body, err = datasets.DownloadFile("https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_weekly_mlo.csv")
	err = datasets.UploadToGoogleCloud(app, body, "co2_weekly_mlo.csv", "co2_weekly_mlo.csv")
	if err != nil {
		log.Fatal(err)
	}
	body, err = datasets.DownloadFile("https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_mm_gl.csv")
	if err != nil {
		log.Fatal(err)
	}
	err = datasets.UploadToGoogleCloud(app, body, "co2_mm_gl.csv", "co2_mm_gl.csv")
	if err != nil {
		log.Fatal(err)
	}
	body, err = datasets.DownloadFile("https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_annmean_gl.csv")
	if err != nil {
		log.Fatal(err)
	}
	err = datasets.UploadToGoogleCloud(app, body, "co2_annmean_gl.csv", "co2_annmean_gl.csv")
	if err != nil {
		log.Fatal(err)
	}
	body, err = datasets.DownloadFile("https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_gr_gl.csv")
	err = datasets.UploadToGoogleCloud(app, body, "co2_gr_gl.csv", "co2_gr_gl.csv")
	if err != nil {
		log.Fatal(err)
	}
	body, err = datasets.DownloadFile("https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_trend_gl.csv")
	if err != nil {
		log.Fatal(err)
	}
	err = datasets.UploadToGoogleCloud(app, body, "co2_trend_gl.csv", "co2_trend_gl.csv")
	if err != nil {
		log.Fatal(err)
	}
	body, err = datasets.DownloadFile("https://gml.noaa.gov/webdata/ccgg/trends/ch4/ch4_mm_gl.txt")
	if err != nil {
		log.Fatal(err)
	}
	err = datasets.UploadToGoogleCloud(app, body, "ch4_mm_gl.txt", "ch4_mm_gl.txt")
	if err != nil {
		log.Fatal(err)
	}
	body, err = datasets.DownloadFile("https://gml.noaa.gov/webdata/ccgg/trends/ch4/ch4_annmean_gl.txt")
	if err != nil {
		log.Fatal(err)
	}
	err = datasets.UploadToGoogleCloud(app, body, "ch4_annmean_gl.txt", "ch4_annmean_gl.txt")
	if err != nil {
		log.Fatal(err)
	}
}
