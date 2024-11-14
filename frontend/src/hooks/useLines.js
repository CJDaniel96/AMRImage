// src/hooks/useLines.js
import { useEffect, useState } from "react";
import axios from "axios";

function useLines() {
  const [lines, setLines] = useState([]);
  useEffect(() => {
    axios
      .get("/api/v1/lines")
      .then((response) => {
        setLines(response.data.lines || []);
      })
      .catch((error) => {
        console.error("Error fetching lines:", error);
        setLines([]); // 设置为空数组，以防止错误
      });
  }, []);
  return lines;
}

export default useLines;
