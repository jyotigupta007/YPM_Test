/*
 onStudentsPick is used to call the data
 Here I have used promise.all but as I am not aware about 
 complete use case. So we can also use Promise.allSettled() if we 
 want to handle both cases failure and success. 

*/
import { fetchStudentData, fetchSchoolData, fetchLegalGuardianData } from "../utils";

const onStudentsPick = async (studentIds) => {
  const studentPromises = studentIds.map((studentId) => fetchStudentData(studentId));
  const newStudentsData = await Promise.all(studentPromises);

  const schoolPromises = newStudentsData.map((student) => fetchSchoolData(student.schoolId));
  const legalGuardianPromises = newStudentsData.map((student) => fetchLegalGuardianData(student.legalGuardianId));

  const newSchoolsData = await Promise.all(schoolPromises);
  const newLegalGuardiansData = await Promise.all(legalGuardianPromises);

  return {
    newStudentsData,
    newSchoolsData,
    newLegalGuardiansData
  };
};

export default onStudentsPick;