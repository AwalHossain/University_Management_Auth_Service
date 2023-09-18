import { RedisClient } from "../../../shared/redis";
import { EVENT_ACADEMIC_DEPARTMENT_CREATED, EVENT_ACADEMIC_DEPARTMENT_DELETED, EVENT_ACADEMIC_DEPARTMENT_UPDATED } from "./academicDepartment.constant";
import { academicDepartmentService } from "./academicDepartment.service";


const initAcadeDepartmentEvent = () => {

    RedisClient.subscribe(EVENT_ACADEMIC_DEPARTMENT_CREATED, async (e: string) => {
        console.log(e, 'init event created');

        const data = JSON.parse(e)
        await academicDepartmentService.createAcademicDepartmentFromEvent(data)
    })

    RedisClient.subscribe(EVENT_ACADEMIC_DEPARTMENT_UPDATED, async (e: string) => {
        console.log(e, 'inir event');

        const data = JSON.parse(e)
        await academicDepartmentService.updateAcademicDepartmentFromEvent(data);
    })


    RedisClient.subscribe(EVENT_ACADEMIC_DEPARTMENT_DELETED, async (e: string) => {
        const data = JSON.parse(e)
        await academicDepartmentService.deleteAcademicDepartmentFromEvent(data);
    })

}


export default initAcadeDepartmentEvent;