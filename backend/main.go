package main

import (
	"AMRImage/configs"
	"AMRImage/router"
	"fmt"
	"log"
	"os"
	"path/filepath"

	"github.com/kardianos/service"
)

var logger service.Logger

type program struct{}

func (p *program) Start(s service.Service) error {
	go p.run()
	return nil
}

func (p *program) Stop(s service.Service) error {
	return nil
}

func (p *program) run() {
	config := configs.GetConfig()
	r := router.InitRouter()
	err := r.Run(fmt.Sprintf("%s:%d", config.App.Host, config.App.Port))
	if err != nil {
		log.Fatalf("failed to run router: %v", err)
	}
}

func main() {
	svcConfig := &service.Config{
		Name:        "AMRImageService",
		DisplayName: "AMR Image Service",
		Description: "This service provides a web interface for downloading AMR images",
	}
	prg := &program{}
	s, err := service.New(prg, svcConfig)
	if err != nil {
		log.Fatal(err)
	}
	logger, err = s.Logger(nil)
	if err != nil {
		log.Fatal(err)
	}

	exePath, err := os.Executable()
	if err != nil {
		log.Fatal("Failed to get executable path: ", err)
	}
	exeDir := filepath.Dir(exePath)
	configPath := filepath.Join(exeDir, "configs", "configs.json")
	if err := configs.ParseConfig(configPath); err != nil {
		log.Fatal(err)
	}

	if len(os.Args) > 1 {
		serviceAction := os.Args[1]
		switch serviceAction {
		case "install":
			if err := s.Install(); err != nil {
				logger.Error(err)
			}
			log.Println("Service installed successfully")
			return
		case "uninstall":
			if err := s.Uninstall(); err != nil {
				logger.Error(err)
			}
			log.Println("Service uninstalled successfully")
			return
		case "start":
			if err := s.Start(); err != nil {
				logger.Error(err)
			}
			log.Println("Service started successfully")
			return
		case "stop":
			if err := s.Stop(); err != nil {
				logger.Error(err)
			}
			log.Println("Service stopped successfully")
			return
		}
	}
	if err := s.Run(); err != nil {
		logger.Error(err)
	}
}
