package middleware

import (
    "AMRImage/configs"
    "path/filepath"
	"fmt"
	"os"
)


func ValidateInputs(line, date, sn, comp string) error {
    if line == "" || date == "" || sn == "" || comp == "" {
        return fmt.Errorf("Date, SN, and Comp fields are required")
    }
    return nil
}

func CheckDirExists(dirPath string) error {
    config := configs.GetConfig()
    dirPath = filepath.Join(config.DataFolder.SfcTempPath, dirPath)
    if _, err := os.Stat(dirPath); os.IsNotExist(err) {
        return fmt.Errorf("Specified date folder does not exist")
    }
    return nil
}