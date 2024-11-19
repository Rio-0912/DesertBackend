const express = require('express');
const router = express.Router();
const { createReview, readReviewsForProduct, updateReview, deleteReview } = require('../Controllers/ReviewController');

router.post('/', createReview);
router.get('/:p_id', readReviewsForProduct);
router.put('/', updateReview);
router.delete('/', deleteReview);

module.exports = router
