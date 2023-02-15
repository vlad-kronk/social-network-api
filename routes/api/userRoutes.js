const router = require('express').Router();
const {
   getUsers,
   getSingleUser,
   createUser,
   updateUser,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getSingleUser).put(updateUser);

module.exports = router;