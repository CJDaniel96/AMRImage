package controller

import (
	"backend/configs"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func Index(c *gin.Context) {
	c.HTML(200, "index.html", gin.H{})
}

// GetLines      godoc
//
//	@Summary		Get all lines
//	@Description	Get all lines
//	@Tags			lines
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	string
//	@Failure		400	{object}	string
//	@Failure		404	{object}	string
//	@Failure		500	{object}	string
//	@Router			/api/v1/lines [get]
func Lines(c *gin.Context) {
	config := configs.GetConfig()
	lines := []string{}
	files, err := os.ReadDir(config.DataFolder.SfcTempPath)
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
