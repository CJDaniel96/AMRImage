package middleware

import (
	"backend/configs"
	"fmt"
	"os"
	"path/filepath"
)

func ValidateInputs(line, date, sn, comp string) error {
	if line == "" || date == "" || sn == "" || comp == "" {
		return fmt.Errorf("date, SN, and Comp fields are required")
	}
	return nil
}

func CheckDirExists(dirPath string) error {
	config := configs.GetConfig()
	dirPath = filepath.Join(config.DataFolder.SfcTempPath, dirPath)
	if _, err := os.Stat(dirPath); os.IsNotExist(err) {
		return fmt.Errorf("specified date folder does not exist")
	}
	return nil
}
