// src/hooks/useComps.js
import { useEffect, useState } from "react";
import axios from "axios";

function useComps(line, date, sn) {
  const [comps, setComps] = useState([]);

  useEffect(() => {
    if (line && date && sn) {
      axios
        .get("/api/v1/get_comp_list", { params: { line, date, sn } })
        .then((response) => {
          setComps(response.data.comps || []);
        })
        .catch((error) => {
          console.error("Error fetching comps:", error);
          setComps([]); // 出现错误时设置为空数组
        });
    } else {
      setComps([]);
    }
  }, [line, date, sn]);

  return comps;
}

export default useComps;
