package controller

import (
	"AMRImage/middleware"
	"AMRImage/utils"
	"net/http"
	"path/filepath"

	"github.com/gin-gonic/gin"
)

// Download godoc
// @Summary Download images
// @Description Download images
// @Tags images
// @Accept json
// @Produce json
// @Param line query string true "Line name"
// @Param date query string true "Date"
// @Param sn query string true "Serial number"
// @Param comp query string true "Component"
// @Success 200 {object} string
// @Failure 400 {object} string
// @Failure 404 {object} string
// @Failure 500 {object} string
// @Router /api/v1/download [get]
func Download(c *gin.Context) {
	line, date, sn, comp := c.Query("line"), c.Query("date"), c.Query("sn"), c.Query("comp")

	if err := middleware.ValidateInputs(line, date, sn, comp); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	dirPath := filepath.Join(line, date)
	if err := middleware.CheckDirExists(dirPath); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	matchingFiles, err := utils.FindMatchingFiles(dirPath, sn, comp)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read image files"})
		return
	}

	if len(matchingFiles) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "No matching images found"})
		return
	}

	pr := utils.SendZipContent(matchingFiles)

	c.Header("Content-Disposition", "attachment; filename=images.zip")
	c.Header("Content-Type", "application/zip")
	c.DataFromReader(http.StatusOK, -1, "application/zip", pr, nil)
}

// ShowImages godoc
// @Summary Show images
// @Description Show images
// @Tags images
// @Accept json
// @Produce json
// @Param line query string true "Line name"
// @Param date query string true "Date"
// @Param sn query string true "Serial number"
// @Param comp query string true "Component"
// @Success 200 {object} string
// @Failure 400 {object} string
// @Failure 404 {object} string
// @Failure 500 {object} string
// @Router /api/v1/images [get]
func ShowImages(c *gin.Context) {
	line, date, sn, comp := c.Query("line"), c.Query("date"), c.Query("sn"), c.Query("comp")

	if err := middleware.ValidateInputs(line, date, sn, comp); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	dirPath := filepath.Join(line, date)
	if err := middleware.CheckDirExists(dirPath); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var matchingFiles []string

	matchingFiles, err := utils.FindMatchingFiles(dirPath, sn, comp)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read image files"})
		return
	}

	if len(matchingFiles) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "No matching images found"})
		return
	}

	aiResult, err := utils.GetAIResultValues(dirPath, matchingFiles)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"line":       line,
		"date":       date,
		"sn":         sn,
		"comp":       comp,
		"imageFiles": aiResult,
	})
}
