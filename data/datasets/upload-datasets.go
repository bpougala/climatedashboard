package datasets

import (
	"context"
	firebase "firebase.google.com/go"
	"fmt"
	"google.golang.org/api/option"
	"io"
	"os"
	"strings"
	"time"
)

func ConnectToFirebase() (*firebase.App, error) {
	opt := option.WithCredentialsFile("../serviceAccountKey.json")
	config := &firebase.Config{StorageBucket: "climatedashboard-f0be5.appspot.com"}
	app, err := firebase.NewApp(context.Background(), config, opt)
	if err != nil {
		return nil, fmt.Errorf("error initializing app: %v", err)
	}
	return app, nil
}
func  UploadToGoogleCloud(app *firebase.App, body string, filename string, object string) error {
	ctx := context.Background()
	tmpFile := fmt.Sprintf("tmp/%v", filename)
	err := CreateTempFile(body, tmpFile)
	fmt.Println("creating temp file")
	if err != nil { return err }
	fmt.Println("tmp file created")
	client, err := app.Storage(ctx)
	if err != nil { return err }
	bucket, err := client.DefaultBucket()
	if err != nil { return err }
	file, err := os.Open(filename)
	if err != nil { return err}
	fmt.Println("Opened file")
	defer file.Close()
	ctx, cancel := context.WithTimeout(ctx, time.Second*50)
	defer cancel()

	writer := bucket.Object(object).NewWriter(ctx)
	if _, err = io.Copy(writer, file); err != nil {
		return fmt.Errorf("io.Copy error: %v", err)
	}
	fmt.Printf("Blob successfully uploaded: %v", object)
	return nil
}

func CreateTempFile(content string, filename string) error {
	out, err := os.Create(filename)
	if err != nil { return err }
	defer out.Close()
	body := strings.NewReader(content)
	_, err = io.Copy(out, body)
	return err
}