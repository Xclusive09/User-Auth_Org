const express = require('express');
const { getUserOrganisations, getOrganisationById, createOrganisation, addUserToOrganisation } = require('../controllers/orgController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

// router.get('/', authenticate, getUserOrganisations);
// router.get('/:orgId', authenticate, getOrganisationById);
// router.post('/', authenticate, createOrganisation);
// router.post('/:orgId/addUser', authenticate, addUserToOrganisation);


router.get('/', getUserOrganisations);
router.get('/:orgId', getUserOrganisations);
router.post('/', createOrganisation);
router.post('/:orgId/users', addUserToOrganisation);

module.exports = router;
