/*
  This is the first approach with following improvements:- 
  1. Clean the code of component more readable
  2. It will stop re-rendering as state is getting set once
  3. Handled Error and loading state
*/

import React, { useState } from "react";
import StudentsPicker from "../components/StudentsPicker";
import Loader from "../components/Loader";
import StudentsTable from "../components/StudentsTable";
import onStudentsPick from "./onStudentsPick";

const StudentsDataComponent = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [schoolsData, setSchoolsData] = useState([]);
  const [legalGuardiansData, setLegalGuardiansData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleStudentsPick = async (studentIds) => {
    setLoading(true);
    const { newStudentsData, newSchoolsData, newLegalGuardiansData, error } = await onStudentsPick(studentIds);
    setLoading(false);
    if (error) {
      setError(error);
      return;
    } 
    setStudentsData((prevStudentsData) => [
      ...prevStudentsData,
      ...newStudentsData,
    ]);
    setSchoolsData((prevSchoolsData) => [
      ...prevSchoolsData,
      ...newSchoolsData,
    ]);
    setLegalGuardiansData((prevLegalGuardiansData) => [
      ...prevLegalGuardiansData,
      ...newLegalGuardiansData,
    ]);
  };

  return (
    <>
      <StudentsPicker onPickHandler={handleStudentsPick} />
      {loading && <Loader/>}
      {error && <div className="error-message">Error: {error}</div>}
      <StudentsTable
        studentsData={studentsData}
        schoolsData={schoolsData}
        legalGuardiansData={legalGuardiansData}
      />
    </>
  );
};

export default StudentsDataComponent;