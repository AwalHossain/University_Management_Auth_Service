import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { ManagementDepartmentController } from './managementDepartment.controller'
import { ManagementDepartmentValidation } from './managementDepartment.validation'


const router = express.Router()

router.get('/:id', ManagementDepartmentController.getSingleDepartment)
router.get('/', ManagementDepartmentController.getAllDepartments);

router.post(
    '/',
    validateRequest(ManagementDepartmentValidation.createManagementDepartmentZodSchema),
    ManagementDepartmentController.createDepartment
);

router.patch('/:id', ManagementDepartmentController.updateDepartment);
router.delete('/:id', ManagementDepartmentController.deleteDepartment)

export const ManagementDepartmentRoutes = router
