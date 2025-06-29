package router

import (
	"backend/configs"
	"backend/controller"
	"os"
	"path/filepath"

	docs "backend/docs"

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
	if err != nil {
		panic(err)
	}

	exeDir := filepath.Dir(exePath)
	frontendPath := filepath.Join(exeDir, "../frontend/dist")

	r.Static("/assets", filepath.Join(frontendPath, "assets"))
	r.StaticFile("/logo.png", filepath.Join(frontendPath, "logo.png"))
	r.StaticFile("/logo_black.png", filepath.Join(frontendPath, "logo_black.png"))
	r.StaticFile("/", filepath.Join(frontendPath, "index.html"))

	r.Static("/images", config.DataFolder.SfcTempPath)

	{
		v1_download := v1.Group("/download")
		v1_download.GET("/download_images", controller.DownloadImages)

		v1.GET("/lines", controller.Lines)
		v1.GET("/show_images", controller.ShowImages)
		v1.GET("/report_script", controller.ReportScript)
		v1.GET("/comp_list", controller.CompList)
	}

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))

	r.NoRoute(func(c *gin.Context) {
		c.File(filepath.Join(frontendPath, "index.html"))
	})
}
