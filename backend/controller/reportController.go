package controller

import (
	"AMRImage/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

// ReportScript godoc
// @Summary Generate report script
// @Description Generate report script
// @Tags report
// @Accept json
// @Produce json
// @Param start_date query string true "Start date"
// @Param end_date query string true "End date"
// @Param model query string true "Model"
// @Success 200 {object} string
// @Failure 400 {object} string
// @Failure 500 {object} string
// @Router /api/v1/report [get]
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
