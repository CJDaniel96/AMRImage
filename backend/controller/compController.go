package controller

import (
	"backend/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

// GetCompList      godoc
//
//	@Summary		Get comp list
//	@Description	Get comp list
//	@Tags			comp
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	string
//	@Failure		400	{object}	string
//	@Failure		404	{object}	string
//	@Failure		500	{object}	string
//	@Router			/api/v1/comp_list [get]
func CompList(c *gin.Context) {
	line := c.Query("line")
	date := c.Query("date")
	sn := c.Query("sn")

	if line == "" || date == "" || sn == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Missing required query parameters: line, date, or sn",
		})
		return
	}

	comps, err := utils.GetComps(line, date, sn)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch comps",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"comps": comps,
	})
}
