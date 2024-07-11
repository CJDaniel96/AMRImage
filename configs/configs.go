package configs

import (
	"encoding/json"
	"fmt"
	"os"
)

type Config struct {
	App struct {
		Name    string `json:"name"`
		Version string `json:"version"`
		Host    string `json:"host"`
		Port    int    `json:"port"`
	} `json:"app"`
	DataFolder struct {
		AIResultFolder string `json:"ai_result_folder"`
		ReportPath     string `json:"report_path"`
		SfcTempPath    string `json:"sfctemp_path"`
	} `json:"data_folder"`
	Database struct {
		Host     string `json:"host"`
		Port     int    `json:"port"`
		Username string `json:"username"`
		Password string `json:"password"`
	} `json:"database"`
}

var config *Config = nil

func GetConfig() *Config {
	return config
}

func ParseConfig(configPath string) error {
	file, err := os.ReadFile(configPath)
	if err != nil {
		return fmt.Errorf("unable to read config file: %w", err)
	}

	err = json.Unmarshal(file, &config)
	if err != nil {
		return fmt.Errorf("unable to parse config JSON: %w", err)
	}

	return nil
}
