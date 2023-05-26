const express = require('express');
const mainController = require('../controllers/main');
const guestMiddleware = require('../middleware/guestMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const router = express.Router();

router.get('/', mainController.home);
router.get('/books/detail/:id', mainController.bookDetail);
router.get('/books/search', mainController.bookSearch);
router.post('/books/search', mainController.bookSearchResult);
router.get('/authors', mainController.authors);
router.get('/authors/:id/books', mainController.authorBooks);
router.get('/users/register', guestMiddleware,mainController.register);
router.post('/users/register', mainController.processRegister);
router.get('/users/login',guestMiddleware, mainController.login);
router.post('/users/login', mainController.processLogin);
router.get('/users/profile', authMiddleware, mainController.profile);
router.delete('/delete/:id',authMiddleware, adminMiddleware, mainController.deleteBook);
router.get('/books/edit/:id', authMiddleware, adminMiddleware, mainController.edit);
router.put('/books/edit/:id', mainController.processEdit);
router.get('/users/logout', mainController.logout);

module.exports = router;
