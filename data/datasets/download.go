package datasets

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func DownloadFile(url string) (string, error) {
	resp, err := http.Get(url)
	if err != nil {
		return "nil", err
	}
	defer resp.Body.Close()
	if resp.StatusCode == http.StatusOK {
		bodyBytes, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			return "nil", err
		}
		body := string(bodyBytes)
		return body, nil
	}
	err = fmt.Errorf("HTTP error occurred with status: %v, (code: %v)", resp.Status, resp.StatusCode)
	return "nil", err
}
