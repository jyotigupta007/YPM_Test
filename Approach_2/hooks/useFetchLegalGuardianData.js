/*
   useFetchLegalGuardianData this is the hook to get legal guardian data
*/

import { useState } from "react";
import { fetchLegalGuardianData } from "../utils";

const useFetchLegalGuardianData = () => {
  const [legalGuardiansData, setLegalGuardiansData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchLegalGuardians = async (legalGuardianIds) => {
    try {
      const legalGuardianPromises = legalGuardianIds.map((legalGuardianId) => fetchLegalGuardianData(legalGuardianId));
      setLoading(true);
      const newLegalGuardiansData = await Promise.all(legalGuardianPromises);
      setLegalGuardiansData((prevLegalGuardiansData) => [...prevLegalGuardiansData, ...newLegalGuardiansData]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return { legalGuardiansData, loading, fetchLegalGuardians, error };
};

export default useFetchLegalGuardianData;