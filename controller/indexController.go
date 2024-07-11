package controller

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"AMRImage/configs"
	"io/ioutil"
)

func Index(c *gin.Context) {
	c.HTML(200, "index.html", gin.H{})
}

func Lines(c *gin.Context) {
	config := configs.GetConfig()
	lines := []string{}
	files, err := ioutil.ReadDir(config.DataFolder.SfcTempPath)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read lines"})
		return
	}

	for _, file := range files {
		if file.IsDir() {
			lines = append(lines, file.Name())
		}
	}

	c.JSON(http.StatusOK, gin.H{"lines": lines})
}