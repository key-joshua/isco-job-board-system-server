import { Router } from 'express';
import multiparty from 'connect-multiparty';
import { uploadService } from '../services/uploadService';
import { idSchema, keywordSchema } from '../validations/validations';
import jobController from '../modules/jobs/controller/jobsController';
import { routeParamsValidation, routeQueryValidation } from '../middlewares/requestMiddleware';

const multipart = multiparty();
const router: Router = Router();

router.post('/create-job', multipart, uploadService, jobController.createJob);
router.get('/get-job/:id', routeParamsValidation(idSchema), jobController.getJob);
router.get('/get-jobs', routeQueryValidation(keywordSchema), jobController.getJobs);
router.delete('/delete-job/:id', routeParamsValidation(idSchema), jobController.deleteJob);
router.patch('/update-job/:id', routeParamsValidation(idSchema), multipart, uploadService, jobController.updateJob);

export default router;
