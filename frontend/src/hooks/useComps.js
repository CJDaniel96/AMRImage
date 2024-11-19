// src/hooks/useComps.js
import { useEffect, useState } from 'react';
import axios from 'axios';

function useComps(line, date, sn) {
  const [comps, setComps] = useState([]);

  useEffect(() => {
    if (line && date && sn) {
      axios
        .get('/api/v1/comp_list', {
          params: { line, date, sn },
        })
        .then((response) => {
          const compList = response.data.comps || [];
          setComps(['ALL', ...compList]);
        })
        .catch((error) => {
          console.error('Error fetching comps:', error);
          setComps([]);
        });
    } else {
      setComps([]);
    }
  }, [line, date, sn]);

  return comps;
}

export default useComps;
