const router = require('express').Router();

const {
   getThoughts,
   getSingleThought,
   createThought,
   updateThought,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);
router.route('/:id').get(getSingleThought).put(updateThought);

module.exports = router;