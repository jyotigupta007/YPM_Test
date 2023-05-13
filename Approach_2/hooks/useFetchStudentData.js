/*
   useFetchStudentData this is the hook to get student data
*/
import { useState } from "react";
import { fetchStudentData } from "../utils";

const useFetchStudentData = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStudents = async (studentIds) => {
    try {
      const studentPromises = studentIds.map((studentId) => fetchStudentData(studentId));
      setLoading(true);
      const newStudentsData = await Promise.all(studentPromises);
      setStudentsData((prevStudentsData) => [...prevStudentsData, ...newStudentsData]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return { studentsData, loading, fetchStudents, error };
};

export default useFetchStudentData;
