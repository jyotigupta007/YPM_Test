/*
 In this approach I am going with hooks. 
 This is more user friendly as we are handling different
 state for each representation of data.
 For improvement and handling we need to know the cases. 
*/
import React from "react";
import StudentsPicker from "../components/StudentsPicker";
import Loader from "../components/Loader";
import StudentsTable from "../components/StudentsTable";
import useFetchStudentData from "../hooks/useFetchStudentData";
import useFetchSchoolData from "../hooks/useFetchSchoolData";
import useFetchLegalGuardianData from "../hooks/useFetchLegalGuardianData";

const StudentsDataComponent = () => {
  const { studentsData, fetchStudents, loading: studentLoading, error: studentError } = useFetchStudentData();
  const { schoolsData, fetchSchools, error: schoolError, loading: schoolLoading } = useFetchSchoolData();
  const { legalGuardiansData, fetchLegalGuardians, error: legalGuardianError, loading: legalGuardianLoading } = useFetchLegalGuardianData();

  useEffect(() => {
    const fetchAdditionalData = async () => {
      const schoolIds = studentsData.map((student) => student.schoolId);
      const legalGuardianIds = studentsData.map((student) => student.legalGuardianId);
      await fetchSchools(schoolIds);
      await fetchLegalGuardians(legalGuardianIds);
    };

    if (studentsData.length) {
      fetchAdditionalData();
    }
  }, [studentsData]);

  const handleStudentsPick = async (studentIds) => {
    await fetchStudents(studentIds);
  };

  /*
   As we have not full access so shown single error and loading
   But On the UI if we have different tables
   then we can show different loading and error.
  */

  const error = studentError || schoolError || legalGuardianError;
  const loading = studentLoading || schoolLoading || legalGuardianLoading;

  return (
    <>
      <StudentsPicker onPickHandler={handleStudentsPick} />
      {loading && <Loader />} 
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