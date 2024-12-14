import Order from "../../models/order.js";
import Branch from "../../models/branch.js";
import { Customer, DeliveryPartner } from "../../models/user.js";

// Helper function to generate random 10-digit order ID
async function generateOrderId() {
  while (true) {
    // Generate a random number between 1000000000 and 9999999999
    const orderID = Math.floor(1000000000 + Math.random() * 9000000000);

    // Check if this order ID already exists
    const existingOrder = await Order.findOne({ orderID });

    // If no existing order found with this ID, return it
    if (!existingOrder) {
      return orderID;
    }
    // If ID exists, the while loop will continue and generate a new one
  }
}
export const createOrder = async (req, reply) => {
  try {
    const { userId } = req.user;
    const { items, branch, totalPrice } = req.body;

    // Input validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return reply.status(400).send({ message: "Invalid items data" });
    }

    // Generate new order ID
    const orderID = await generateOrderId();

    // Fetch customer and branch data
    const [customerData, branchData] = await Promise.all([
      Customer.findById(userId),
      Branch.findById(branch),
    ]);

    if (!customerData) {
      return reply.status(404).send({ message: "Customer not found" });
    }

    if (!branchData) {
      return reply.status(404).send({ message: "Branch not found" });
    }

    // Set default location if not available
    const defaultLocation = {
      latitude: 0,
      longitude: 0,
      address: "No address available",
    };

    // Create new order with orderID
    const newOrder = new Order({
      orderID, // Add the generated orderID
      customer: userId,
      items: items.map((item) => ({
        id: item.id,
        item: item.item,
        count: item.count,
      })),
      status: "available",
      branch,
      totalPrice,
      deliveryLocation: {
        latitude:
          customerData.liveLocation?.latitude || defaultLocation.latitude,
        longitude:
          customerData.liveLocation?.longitude || defaultLocation.longitude,
        address: customerData.address || defaultLocation.address,
      },
      pickupLocation: {
        latitude: branchData.liveLocation?.latitude || defaultLocation.latitude,
        longitude:
          branchData.liveLocation?.longitude || defaultLocation.longitude,
        address: branchData.address || defaultLocation.address,
      },
    });

    const savedOrder = await newOrder.save();
    return reply.status(201).send(savedOrder);
  } catch (err) {
    console.error("Order creation error:", err);
    return reply.status(500).send({
      message: "Failed to Create Order",
      error: err.message,
    });
  }
};

export const confirmOrder = async (req, reply) => {
  try {
    const { orderId } = req.params;
    const { userId } = req.user;
    const { deliveryPersonLocation } = req.body;
    const deliveryPerson = await DeliveryPartner.findById(userId);

    if (!deliveryPerson) {
      return reply.status(404).send({ message: "Delivery Person not found" });
    }

    const order = await Order.findById(orderId);
    if (!order) return reply.status(404).send({ message: "order not found" });

    if (order.status !== "available") {
      return reply.status(400).send({ message: "Order is not available" });
    }

    order.status = "confirmed";

    order.deliveryPartner = userId;
    order.deliveryPersonLocation = {
      latitude: deliveryPersonLocation?.latitude,
      longitude: deliveryPersonLocation?.longitude,
      address: deliveryPersonLocation.address || "",
    };

    req.server.io.to(orderId).emit("orderConfirmed", order);

    await order.save();

    return reply.send(order);
  } catch (error) {
    return reply
      .status(500)
      .send({ message: "Failed to Confirm Order", error });
  }
};

export const updateOrderStatus = async (req, reply) => {
  try {
    const { orderId } = req.params;
    const { status, deliveryPersonLocation } = req.body;
    const { userId } = req.user;

    const deliveryPerson = await DeliveryPartner.findById(userId);
    if (!deliveryPerson) {
      return reply.status(404).send({ message: "Delivery Person not found" });
    }
    /////////////
    const order = await Order.findById(orderId);
    if (!order) return reply.status(404).send({ message: "order not found" });

    if (["cancelled", "delivered"].includes(order.status)) {
      return reply.status(400).send({ message: "Order cannot be updated" });
    }

    if (order.deliveryPartner.toString() !== userId) {
      return reply.status(403).send({ message: "Unauthorized" });
    }

    order.status = status;

    order.deliveryPersonLocation = deliveryPersonLocation;

    await order.save();

    req.server.io.to(orderId).emit("liveTrackingUpdates", order);

    return reply.send(order);
    ///
  } catch (error) {
    return reply
      .status(500)
      .send({ message: "Failed to Update order Status Order", error });
  }
};

export const getOrder = async (req, reply) => {
  try {
    const { status, customerId, deliveryPartnerId, branchId } = req.query;
    let query = {};

    if (status) {
      query.status = status;
    }
    if (customerId) {
      query.customer = customerId;
    }
    if (deliveryPartnerId) {
      query.deliveryPartner = deliveryPartnerId;
      query.branch = branchId;
    }

    const orders = await Order.find(query).populate(
      "customer branch items.item deliveryPartner"
    );

    return reply.send(orders);
  } catch (error) {
    return reply
      .status(500)
      .send({ message: "Failed to retrieve orders", error });
  }
};

export const getOrderById = async (req, reply) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(order).populate(
      "customer branch items.item deliveryPartner"
    );

    if (!order) {
      return reply.status(404).send({ message: "Order not found" });
    }

    return reply.send(order);
  } catch (error) {
    return reply
      .status(500)
      .send({ message: "Failed to retrieve order", error });
  }
};
