import express from 'express';
import { createRequestOrder, getAllRequestOrders } from '../controllers/createRequestOrder.js';

const router = express.Router();

// POST: Create new request order
router.post('/request-orders', createRequestOrder);
router.get('/request-orders', getAllRequestOrders);

export default router;
