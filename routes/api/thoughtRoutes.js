const router = require('express').Router();

const {
   getThoughts,
   getSingleThought,
   createThought,
   updateThought,
   deleteThought,
   addReaction,
   removeReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);
router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought);
router.route('/:id/reactions').post(addReaction);
router.route('/:id/reactions/:rid').delete(removeReaction);

module.exports = router;