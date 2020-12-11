const {Router} = require('express');

const tokenAuth = require('./middlewares/authToken');

const TokenController = require('../src/controllers/TokenController');

const UserController = require('../src/controllers/UserController');
const CostCenterController = require('./controllers/CostCenterController');
const DepartmentController = require('../src/controllers/DepartmentController');
const ImportListController = require('../src/controllers/ImportListController');

const router = new Router();

router.post('/login', TokenController.create);

router.use(tokenAuth);

router.get('/user', UserController.findAll);
router.post('/user', UserController.create);
router.put('/user', UserController.update);
router.delete('/user/:user_id', UserController.delete);

router.get('/department', DepartmentController.findAll);
router.post('/department', DepartmentController.create);
router.put('/department', DepartmentController.update);
router.delete('/department/:department_id', DepartmentController.delete);

router.get('/cost-center', CostCenterController.findAll);
router.post('/cost-center', CostCenterController.create);
router.put('/cost-center', CostCenterController.update);
router.delete('/cost-center/:cost_center_id', CostCenterController.delete);

router.post('/import-list', ImportListController.create);

module.exports = router;


