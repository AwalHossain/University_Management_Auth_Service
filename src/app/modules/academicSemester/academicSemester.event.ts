import { RedisClient } from "../../../shared/redis"
import { EVENT_ACADEMIC_SEMESTER_CREATED, EVENT_ACADEMIC_SEMESTER_DELETED, EVENT_ACADEMIC_SEMESTER_UPDATED } from "./academicSemester.constant"
import { AcademicSemesterService } from "./academicSemester.service"




const initAcademicSemesterEvent = () => {

    RedisClient.subscribe(EVENT_ACADEMIC_SEMESTER_CREATED, async (e: string) => {
        console.log(e, 'init event created');

        const data = JSON.parse(e)
        await AcademicSemesterService.createAcademicSemesterFromEvent(data)
    })

    RedisClient.subscribe(EVENT_ACADEMIC_SEMESTER_UPDATED, async (e: string) => {
        console.log(e, 'inir event');

        const data = JSON.parse(e)
        await AcademicSemesterService.updateAcademicSemesterFromEvent(data);
    })

    RedisClient.subscribe(EVENT_ACADEMIC_SEMESTER_DELETED, async (e: string) => {
        const data = JSON.parse(e)
        await AcademicSemesterService.deleteAcademicSemesterFromEvent(data);
    })
}


export default initAcademicSemesterEvent;