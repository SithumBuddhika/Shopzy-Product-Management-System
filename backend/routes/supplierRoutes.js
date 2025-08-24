import express from 'express';
import {
  createSupplier,
  getAllSuppliers,
  updateSupplier,
  deleteSupplier,
  searchSuppliers,
  getSupplierById,
  downloadSupplierExcel
} from '../controllers/supplierContoller.js'

const router = express.Router();

// POST: Create supplier
router.post('/suppliers', createSupplier);

// GET: Read all suppliers
router.get('/suppliers', getAllSuppliers);

// PUT: Update supplier
router.put('/suppliers/:id', updateSupplier);

// DELETE: Delete supplier
router.delete('/suppliers/:id', deleteSupplier);

// New route: Excel download
router.get('/suppliers/excel', downloadSupplierExcel);

// Search suppliers
router.get('/suppliers/search', searchSuppliers);

// GET: Get supplier by ID
router.get('/suppliers/:id', getSupplierById);

export default router;
