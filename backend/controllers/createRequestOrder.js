import RequestOrder from '../models/RequestOrders.js';

export const createRequestOrder = async (req, res) => {
  try {
    console.log("📥 Incoming order body:", req.body);

    const {
      companyName,
      maxQuantity,
      minOrderQuantity, // This will be renamed
      phoneNumber,
      foodType,
      itemCategory,
      orderedQuantity // This will be renamed
    } = req.body;

    // ✅ Rename to match schema
    if (
      !companyName ||
      !maxQuantity ||
      !minOrderQuantity ||
      !phoneNumber ||
      !foodType ||
      !itemCategory || 
      !orderedQuantity
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newRequest = new RequestOrder({
      companyName,
      maxQuantity,
      minQuantity: minOrderQuantity,     // ✅ rename here
      phoneNumber,
      foodType,
      itemCategory,
      orderQuantity: orderedQuantity     // ✅ rename here
    });

    await newRequest.save();

    res.status(201).json({
      message: 'Request order created successfully',
      order: newRequest
    });
  } catch (error) {
    console.error('Create Request Order Error:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getAllRequestOrders = async (req, res) => {
  try {
    const orders = await RequestOrder.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching request orders:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};
