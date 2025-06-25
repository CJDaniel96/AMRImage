// src/components/ShowImages.jsx
import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import useLines from "../hooks/useLines";
import useComps from "../hooks/useComps";
import { handleFormChange } from "../utils/handleFormChange";
import { ImageFormFields } from "./FormFields";
import Modal from "react-bootstrap/Modal";

function ShowImages() {
  const { t } = useTranslation();
  const lines = useLines();
  const [formData, setFormData] = useState({ line: "", date: "", sn: "", comp: "" });
  const comps = useComps(formData.line, formData.date, formData.sn);
  const [imageFiles, setImageFiles] = useState([]);
  const [selectedLights, setSelectedLights] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  const handleChange = handleFormChange(setFormData);

  const handleDownloadTable = async () => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Image Report");

      worksheet.columns = [
        { header: "#", key: "id", width: 5 },
        { header: t("file_name"), key: "fileName", width: 55 },
        { header: t("comp_name"), key: "compName", width: 15 },
        { header: t("image"), key: "image", width: 15 },
        { header: t("light_source"), key: "lightSource", width: 10 },
        { header: t("ai_results"), key: "aiResult", width: 10 },
      ];

      for (const [index, file] of filteredImageFiles.entries()) {
        const pathParts = file.path.split(/[\\/]/);
        const fileName = pathParts[pathParts.length - 1];
        const imageUrl = `/images/${encodeURIComponent(file.path.replace(/\\/g, "/"))}`;
        const row = worksheet.addRow({
          id: index + 1,
          fileName: fileName,
          compName: file.comp_name,
          lightSource: file.light_source,
          aiResult: file.ai_result,
        });
        
        try {
          const response = await fetch(imageUrl);
          if (response.ok) {
            const imageBuffer = await response.arrayBuffer();
            const extension = fileName.split(".").pop().toLowerCase() === "png" ? "png" : "jpeg";
            const imageId = workbook.addImage({ buffer: imageBuffer, extension: extension });
            worksheet.addImage(imageId, `D${row.number}:D${row.number}`);
            row.height = 90;
          }
        } catch (imgError) {
          console.error(`Could not fetch image: ${fileName}`, imgError);
        }
      }
      worksheet.getRow(1).font = { bold: true };

      const buffer = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([buffer]), "images_report.xlsx");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const parseCompName = (filename) => {
    const m = filename.match(/@(.+?)_\d+/i);
    return m ? m[1] : "";
  };

  const handleShowImages = (e) => {
    e.preventDefault();
    const { line, date, sn, comp } = formData;
    if (!line || !date || !sn || !comp) {
        alert(t('required_field', { field: t('line') + '、' + t('date') + '、' + t('sn') + '、' + t('comp') }));
        return;
    }
    axios.get("/api/v1/show_images", { params: formData })
      .then((response) => {
        const files = (response.data.imageFiles || []).map((f) => {
          const fname = f.path.split(/[\\/]/).pop();
          return { ...f, comp_name: parseCompName(fname) };
        });
        setImageFiles(files);
      })
      .catch((error) => console.error("Error fetching images:", error));
  };

  const handleLightChange = (e) => setSelectedLights(e.target.value);
  const getUniqueLights = () => [...new Set(imageFiles.map((file) => file.light_source || ""))];

  const filteredImageFiles = selectedLights ? imageFiles.filter((file) => file.light_source === selectedLights) : imageFiles;

  const handleImageClick = (imagePath) => {
    setSelectedImage(`/images/${encodeURIComponent(imagePath.replace(/\\/g, "/"))}`);
    setModalShow(true);
  };

  return (
    <>
      <div className="row justify-content-center mb-5">
        <div className="col-lg-8 col-md-10">
          <div className="custom-card">
            <h4 className="custom-card-title">{t("show_amr_images")}</h4>
            <form className="w-w-100 d-flex flex-column align-items-center" onSubmit={handleShowImages}>
              <ImageFormFields lines={lines} comps={comps} formData={formData} handleChange={handleChange} />
              <div className="text-center mt-4">
                <button type="submit" className="btn-custom-primary">{t("show")}</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {imageFiles.length > 0 && (
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="d-flex justify-content-end mb-3">
              <button className="btn-custom-success" onClick={handleDownloadTable} disabled={isExporting}>
                {isExporting ? t("exporting") : t("download_table")}
              </button>
            </div>
            <div className="custom-table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>{t("file_name")}</th>
                    <th>{t("comp_name")}</th>
                    <th>{t("image")}</th>
                    <th>
                      <select className="form-select form-select-sm" value={selectedLights} onChange={handleLightChange}>
                        <option value="">{t("select_light_sources")}</option>
                        {getUniqueLights().map((light) => (
                          <option key={light} value={light}>{t("light_source")} {light}</option>
                        ))}
                      </select>
                    </th>
                    <th>{t("ai_results")}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredImageFiles.map((file, index) => {
                    const pathParts = file.path.split(/[\\/]/);
                    const filename = pathParts[pathParts.length - 1];
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="text-start">{filename}</td>
                        <td>{ file.comp_name }</td>
                        <td>
                          <img src={`/images/${encodeURIComponent(file.path.replace(/\\/g, "/"))}`} alt="AMR" onClick={() => handleImageClick(file.path)} />
                        </td>
                        <td>{file.light_source}</td>
                        <td>{file.ai_result}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <Modal show={modalShow} onHide={() => setModalShow(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{t("enlarged_image")}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          <img src={selectedImage} alt="Enlarged AMR" className="img-fluid" style={{ maxHeight: "75vh", borderRadius: "8px" }} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ShowImages;
