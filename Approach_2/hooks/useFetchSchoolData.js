/*
   useFetchSchoolData this is the hook to get school data
*/
import { useState } from "react";
import { fetchSchoolData } from "../utils";

const useFetchSchoolData = () => {
  const [schoolsData, setSchoolsData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSchools = async (schoolIds) => {
    try {
      const schoolPromises = schoolIds.map((schoolId) => fetchSchoolData(schoolId));
      setLoading(true);
      const newSchoolsData = await Promise.all(schoolPromises);
      setSchoolsData((prevSchoolsData) => [...prevSchoolsData, ...newSchoolsData]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return { schoolsData, loading, fetchSchools, error };
};

export default useFetchSchoolData;