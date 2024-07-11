package utils

import (
	"AMRImage/configs"
	"archive/zip"
	"fmt"
	"io"
    "io/ioutil"
	"os"
    "os/exec"
	"regexp"
    "strings"
	"path/filepath"
)


func FindMatchingFiles(dirPath, sn, comp string) ([]string, error) {
    config := configs.GetConfig()
    pattern := filepath.Join(config.DataFolder.SfcTempPath, dirPath, "*", fmt.Sprintf("*%s*%s*", sn, comp))
    return filepath.Glob(pattern)
}

func SendZipContent(matchingFiles []string) io.Reader {
    config := configs.GetConfig()

	pr, pw := io.Pipe()
	zipWriter := zip.NewWriter(pw)
	
	go func() {
		defer pw.Close()
		defer zipWriter.Close()
		for _, filePath := range matchingFiles {
			if err := AddFileToZip(zipWriter, config.DataFolder.SfcTempPath, filePath); err != nil {
				continue // Skip files that can't be added
			}
		}
	}()

	return pr
}

func AddFileToZip(zipWriter *zip.Writer, dirPath, filePath string) error {
    file, err := os.Open(filePath)
    if err != nil {
        return err
    }
    defer file.Close()

    relativePath, err := filepath.Rel(dirPath, filePath)
    if err != nil {
        return err
    }

    zipFile, err := zipWriter.Create(relativePath)
    if err != nil {
        return err
    }

    _, err = io.Copy(zipFile, file)
    return err
}

func GetAIResultValues(dirPath string, paths []string) ([]map[string]string, error) {
    config := configs.GetConfig()
    aiResultFolder := config.DataFolder.AIResultFolder
    dirPath = filepath.Join(aiResultFolder, dirPath)

    var result []map[string]string
    for _, path := range paths {
        relativePath, err := filepath.Rel(config.DataFolder.SfcTempPath, path)
        if err != nil {
            return nil, err
        }

        values, err := processPath(dirPath, relativePath)
        if err != nil {
            return nil, err
        }
        if values != nil {
            result = append(result, values)
        }
    }
    return result, nil
}

func processPath(dirPath, path string) (map[string]string, error) {
    fileName := filepath.Base(path)
    parts := strings.Split(fileName, "_")
    if len(parts) < 3 {
        return map[string]string{"path": path, "ai_result": "N/A"}, nil
    }

    panel := parts[1]
    matches := extractMatches(path)
    if matches == nil {
        return map[string]string{"path": path, "ai_result": "N/A"}, nil
    }

    component, num := matches[1], matches[2]
    pattern := filepath.Join(dirPath, panel, fmt.Sprintf("*%s*%s*_*", component, num))
    matchesFiles, err := filepath.Glob(pattern)
    if err != nil {
        return map[string]string{"path": path, "ai_result": "N/A"}, nil
    }

    if len(matchesFiles) > 0 {
        for _, matchFile := range matchesFiles {
            matches := extractResultMatches(matchFile)
            if matches != nil {
                return map[string]string{"path": path, "ai_result": matches[3]}, nil
            }
        }
    } else {
        return map[string]string{"path": path, "ai_result": "N/A"}, nil
    }
    return map[string]string{"path": path, "ai_result": "N/A"}, nil
}

func extractMatches(path string) []string {
    re := regexp.MustCompile(`T@(\w+)_(\w+)_(\w+)\.j`)
    return re.FindStringSubmatch(path)
}

func extractResultMatches(matchFile string) []string {
    re := regexp.MustCompile(`@(\w+)_(\w+)_(\w+)\.t`)
    return re.FindStringSubmatch(matchFile)
}

func GenerateReportScript(startDate, endDate, model string) ([]byte, error) {
    config := configs.GetConfig()

    var cmd *exec.Cmd
    if len(model) == 0 {
        cmd = exec.Command("python", "ai_report_with_xml_v2.py", "-d", startDate, "-e", endDate)
    } else {
        cmd = exec.Command("python", "ai_report_with_xml_v2.py", "-d", startDate, "-e", endDate, "-m", model)
    }

    cmd.Dir = config.DataFolder.ReportPath
    _, err := cmd.CombinedOutput()
    if err != nil {
        return nil, fmt.Errorf("Failed to run python script: %s", err)
    }

    excelFilePath := filepath.Join(config.DataFolder.ReportPath, "report.xlsx")
    excelFile, err := os.Open(excelFilePath)
    if err != nil {
        return nil, fmt.Errorf("Failed to open report file: %s", err)
    }
    defer excelFile.Close()

    excelFileBytes, err := ioutil.ReadAll(excelFile)
    if err != nil {
        return nil, fmt.Errorf("Failed to read report file: %s", err)
    }

    return excelFileBytes, nil
}