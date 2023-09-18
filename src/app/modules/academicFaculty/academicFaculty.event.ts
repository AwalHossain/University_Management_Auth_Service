import { RedisClient } from "../../../shared/redis";
import { EVENT_ACADEMIC_FACULTY_CREATED, EVENT_ACADEMIC_FACULTY_DELETED, EVENT_ACADEMIC_FACULTY_UPDATED } from "./academicFaculty.constants";
import { AcademicFacultyService } from "./academicFaculty.service";



const initAcademicFacultyEvent = () => {
    RedisClient.subscribe(EVENT_ACADEMIC_FACULTY_CREATED, async (e: string) => {
        await AcademicFacultyService.creatAcademicFacultyFromEvent(JSON.parse(e))

    })

    RedisClient.subscribe(EVENT_ACADEMIC_FACULTY_UPDATED, async (e: string) => {

        await AcademicFacultyService.updateAcademicFacultyFromEvent(JSON.parse(e))
    })


    RedisClient.subscribe(EVENT_ACADEMIC_FACULTY_DELETED, async (e: string) => {
        console.log(e, 'check')
        await AcademicFacultyService.deleteAcademicFacultyFromEvent(JSON.parse(e))
    })
}


export default initAcademicFacultyEvent;