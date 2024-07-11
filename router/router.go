package router

import (
	"AMRImage/configs"
	"github.com/gin-gonic/gin"
	"AMRImage/controller"
)

func InitRouter() *gin.Engine {
	r := gin.Default()
	r.Use(gin.Logger())
	r.Use(gin.Recovery())

	registerRouter(r)
	return r
}

func registerRouter(r *gin.Engine) {
	config := configs.GetConfig()
	r.LoadHTMLGlob("assets/*")
	r.Static("/assets", "./assets")
	r.Static("/images", config.DataFolder.SfcTempPath)
	r.GET("/", controller.Index)
	r.GET("/download", controller.Download)
	r.GET("/lines", controller.Lines)
	r.GET("/show_images", controller.ShowImages)
	r.GET("/report_script", controller.ReportScript)
}