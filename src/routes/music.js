const express = require('express');
const router = express.Router();
const controller = require('../controllers/MusicController');

router.get('/', controller.get);
router.get('/id/:id', controller.getById);
router.get('/album/:id', controller.getAlbumById);
router.get('/author/:id', controller.getAuthorById);

// esse get pega todos, inclusive as tracks desativadas
router.get('/admin', controller.getAll);
router.put('/admin/update/:id', controller.put)
router.post('/admin/add', controller.post);
router.delete('/admin/delete/:id', controller.delete)

module.exports = router;