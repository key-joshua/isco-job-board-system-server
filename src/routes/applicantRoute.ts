import { Router } from 'express';
import multiparty from 'connect-multiparty';
import { uploadService } from '../services/uploadService';
import { idSchema, keywordSchema } from '../validations/validations';
import applicantsController from '../modules/applicants/controller/applicantsController';
import { routeParamsValidation, routeQueryValidation } from '../middlewares/requestMiddleware';

const multipart = multiparty();
const router: Router = Router();

router.post('/create-applicant', multipart, uploadService, applicantsController.createApplicant);
router.get('/get-applicant/:id', routeParamsValidation(idSchema), applicantsController.getApplicant);
router.get('/get-applicants', routeQueryValidation(keywordSchema), applicantsController.getApplicants);
router.patch('/update-applicant/:id', routeParamsValidation(idSchema), applicantsController.updateApplicant);
router.delete('/delete-applicant/:id', routeParamsValidation(idSchema), applicantsController.deleteApplicant);

export default router;
