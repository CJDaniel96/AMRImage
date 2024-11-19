// src/components/ShowImages.jsx
import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import useLines from "../hooks/useLines";
import useComps from "../hooks/useComps";
import { handleFormChange } from "../utils/handleFormChange";
import { ImageFormFields } from "./FormFields";

function ShowImages() {
  const { t } = useTranslation();
  const lines = useLines();
  const [formData, setFormData] = useState({
    line: "",
    date: "",
    sn: "",
    comp: "",
  });

  const comps = useComps(formData.line, formData.date, formData.sn);
  const [imageFiles, setImageFiles] = useState([]);
  const [selectedLights, setSelectedLights] = useState([]);

  const handleChange = handleFormChange(setFormData);

  const handleShowImages = (e) => {
    e.preventDefault();
    const { line, date, sn, comp } = formData;
    if (!line || !date || !sn || !comp) {
      alert(
        t("required_field", {
          field:
            t("line") + "、" + t("date") + "、" + t("sn") + "、" + t("comp"),
        })
      );
      return;
    }
    axios
      .get("/api/v1/show_images", {
        params: { line, date, sn, comp },
      })
      .then((response) => {
        setImageFiles(response.data.imageFiles || []);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        setImageFiles([]);
      });
  };

  const handleLightChange = (e) => {
    setSelectedLights(e.target.value);
  }

  const getUniqueLights = () => {
    const lights = imageFiles.map((file) => {
      const match = file.path.match(/_([^_.]+)\./);
      return match ? match[1] : "";
    });
    return [...new Set(lights)];
  }

  const filteredImageFiles = selectedLights.length > 0
    ? imageFiles.filter((file) => {
      const match = file.path.match(/_([^_.]+)\./);
      const light = match ? match[1] : "";
      return selectedLights.includes(light);
    })
    : imageFiles;

  function extractLightSource(filename) {
    const regex = /_([^_.]+)\./;
    const match = filename.match(regex);

    if (match && match.length > 1) {
      return match[1];
    } else {
      return null;
    }
  }

  return (
    <>
      <div className="row justify-content-center mb-5">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body d-flex flex-column align-items-center">
              <h4 className="card-title mb-4">{t("show_amr_images")}</h4>
              <form
                className="w-100 d-flex flex-column align-items-center"
                onSubmit={handleShowImages}
              >
                {/* Reuse FormFields */}
                <ImageFormFields
                  lines={lines}
                  comps={comps}
                  formData={formData}
                  handleChange={handleChange}
                />

                {/* Submit */}
                <button
                  type="submit"
                  className="btn btn-primary align-items-center"
                >
                  {t("show")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* 显示图片结果 */}
      {imageFiles.length > 0 && (
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="card shadow mb-3">
              <div className="card-body">
                <h4 className="card-title text-center mb-4">{t("results")}</h4>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-primary">
                      <tr>
                        <th className="text-center align-middle">#</th>
                        <th className="text-center align-middle">{t("file_name")}</th>
                        <th className="text-center align-middle">{t("image")}</th>
                        <th className="text-center align-middle">
                          <select
                            className="form-select"
                            value={selectedLights}
                            onChange={handleLightChange}
                          >
                            <option className="text-center align-middle" value="">{t("select_light_sources")}</option>
                            {getUniqueLights().map((light, index) => (
                              <option className="text-center align-middle" key={index} value={light}>
                                {t("light_source")} {light}
                              </option>
                            ))}
                          </select>
                        </th>
                        <th className="text-center align-middle">{t("ai_results")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredImageFiles.map((file, index) => {
                        const pathpart = file.path.split('\\');
                        const filename = pathpart[pathpart.length - 1];
                        const light = extractLightSource(filename);
                        return (
                          <tr key={index}>
                            <td className="text-center align-middle">{index + 1}</td>
                            <td className="text-center align-middle">{filename}</td>
                            <td className="text-center align-middle">
                              <img
                                src={`/images/${encodeURIComponent(file.path.replace(/\\/g, "/"))}`}
                                alt="AMR"
                                className="img-fluid img-thumbnail"
                                style={{ maxWidth: "150px" }}
                              />
                            </td>
                            <td className="text-center align-middle">{light}</td>
                            <td className="text-center align-middle">{file.ai_result}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ShowImages;
