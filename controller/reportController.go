package controller

import (
	"AMRImage/utils"
	"net/http"
	"github.com/gin-gonic/gin"
)

func ReportScript(c *gin.Context) {
	startDate, endDate, model := c.Query("start_date"), c.Query("end_date"), c.Query("model")

	excelFileBytes, err := utils.GenerateReportScript(startDate, endDate, model)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate report"})
		return
	}

	c.Header("Content-Disposition", "attachment; filename=report.xlsx")
    c.Data(http.StatusOK, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", excelFileBytes)
}