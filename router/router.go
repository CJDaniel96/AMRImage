package router

import (
	"AMRImage/configs"
	"AMRImage/controller"
	"os"
	"path/filepath"

	docs "AMRImage/docs"

	"github.com/gin-gonic/gin"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func InitRouter() *gin.Engine {
	r := gin.Default()
	r.Use(gin.Logger())
	r.Use(gin.Recovery())

	registerRouter(r)
	return r
}

func registerRouter(r *gin.Engine) {
	docs.SwaggerInfo.BasePath = "/api/v1"
	v1 := r.Group("/api/v1")

	config := configs.GetConfig()
	exePath, err := os.Executable()
	if err == nil {
		exeDir := filepath.Dir(exePath)
		r.LoadHTMLGlob(filepath.Join(exeDir, "assets/*"))
		r.Static("/assets", filepath.Join(exeDir, "assets"))
	}

	r.Static("/images", config.DataFolder.SfcTempPath)
	r.GET("/", controller.Index)

	{
		v1.GET("/download", controller.Download)
		v1.GET("/lines", controller.Lines)
		v1.GET("/show_images", controller.ShowImages)
		v1.GET("/report_script", controller.ReportScript)
	}

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))
}
