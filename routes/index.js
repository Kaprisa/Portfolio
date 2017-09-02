const express = require('express');
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers');

const homeController = require('../controllers/homeController');
const blogController = require('../controllers/blogController');
const aboutController = require('../controllers/aboutController');
const worksController = require('../controllers/worksController');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const mailController = require('../controllers/mailController');

router.get('/', homeController.getHome);
router.get('/blog', catchErrors(blogController.getBlog));
router.get('/about', catchErrors(aboutController.getAbout));
router.get('/works', catchErrors(worksController.getWorks));
router.get('/admin/profile', authController.isAdmin, adminController.getProfile);
router.post('/profile/update', authController.isLoggedIn, catchErrors(adminController.updateProfile));
router.get('/admin', authController.isAdmin, catchErrors(adminController.getHome));
router.get('/admin/:page', authController.isAdmin, catchErrors(adminController.getHome));

router.post('/skills/update', catchErrors(aboutController.updateSkillsGlobal));
router.delete('/skills/:category', catchErrors(aboutController.removeCategorySkills));
router.get('/skills', catchErrors(aboutController.getSkills));
router.post('/skills/update/:category', catchErrors(aboutController.updateCategorySkills));

router.post('/article/add', catchErrors(blogController.addArticle));
router.post('/article/:id/update', catchErrors(blogController.updateArticle));
router.get('/article/:id/edit', catchErrors(blogController.editArticle));
router.get('/articles', catchErrors(blogController.getArticlesByCategory));
router.get('/articles/:id', catchErrors(blogController.getArticleById));
router.delete('/articles/:id', catchErrors(blogController.deleteArticle));
router.delete('/articles/category/:category', catchErrors(blogController.deleteArticlesByCategory));

router.post('/works/add', worksController.upload, catchErrors(worksController.resize), catchErrors(worksController.addWork));
router.delete('/works/:id', catchErrors(worksController.deleteWork));

router.post('/register', authController.validateRegister, authController.register, authController.login);
router.post('/login', authController.login);
router.post('/account/forgot', catchErrors(authController.forgot));
router.get('/account/reset/:token', catchErrors(authController.reset));
router.post('/account/reset/:token', authController.confirmedPassword, catchErrors(authController.update));
router.get('/logout', authController.isLoggedIn, authController.logout);

router.post('/contact', catchErrors(mailController.sendContactMessage));


module.exports = router;
