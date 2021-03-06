// import { authController } from '@controllers';
import formController from '@api/v1/forms/form-controller';
import { requireRole } from '@middlewear/auth-mw';
import { Router } from 'express';
import cors from 'cors';

const router = Router({ mergeParams: true });

/* POST New Form Submission */
router.post('/:formId/submissions', cors({ origin: '*' }), formController.postFormSubmission);

router.use(requireRole('ADMIN'));

/* GET All Forms */
router.get('/', formController.getAllForms);

/* GET Specfic Form */
router.get('/:id', formController.getFormByID);

/* GET Form Submissions */
router.get('/:id/submissions', formController.getFormSubmissions);

/* POST New Form */
router.post('/:websiteId', formController.postForm);

/* UPDATE Form */
router.put('/:id', formController.putForm);

/* DELETE Form */
router.delete('/:id', formController.deleteForm);

export default router;
