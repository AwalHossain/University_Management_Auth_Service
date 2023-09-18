import initAcadeDepartmentEvent from "../modules/academicDepartment/academicDepartment.event";
import initAcademicFacultyEvent from "../modules/academicFaculty/academicFaculty.event";
import initAcademicSemesterEvent from "../modules/academicSemester/academicSemester.event";



const subscribeToEvent = () => {
    initAcademicSemesterEvent();
    initAcadeDepartmentEvent();
    initAcademicFacultyEvent();
}

export default subscribeToEvent;