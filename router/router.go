package router

import (
	"AMRImage/configs"
	"AMRImage/controller"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
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

	exePath, err := os.Executable()
	if err == nil {
		exeDir := filepath.Dir(exePath)
		r.LoadHTMLGlob(filepath.Join(exeDir, "assets/*"))
		r.Static("/assets", filepath.Join(exeDir, "assets"))
	}

	r.Static("/images", config.DataFolder.SfcTempPath)
	r.GET("/", controller.Index)
	r.GET("/download", controller.Download)
	r.GET("/lines", controller.Lines)
	r.GET("/show_images", controller.ShowImages)
	r.GET("/report_script", controller.ReportScript)
}
