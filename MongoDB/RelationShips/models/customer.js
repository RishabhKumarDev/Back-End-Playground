const mongoose = require("mongoose");
const { Schema } = require("mongoose");

(async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/relationalDemo");
    console.log("succesful connection ---- mongoose/mongoDB");
  } catch (error) {
    console.log(error);
  }
})();

const orderSchema = new Schema({
  item: String,
  price: Number,
});

const customerSchema = new Schema({
  name: String,
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

customerSchema.pre("findOneAndDelete", function () {
  console.log("PRE MIDDLEWARE");
});

customerSchema.post("findOneAndDelete", async function (customer, next) {
  if (!customer.orders.length) return next();
  const deleteOrders = await Order.deleteMany({
    _id: { $in: customer.orders },
  });

  console.log(deleteOrders);
  console.log("POST MIDDLEWARE");
});

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

const addCustomer = async () => {
  const customer1 = new Customer({
    name: "karan",
  });

  let order1 = await Order.findOne({ item: "pizza" });
  let order2 = await Order.findOne({ item: "samosa" });

  customer1.orders.push(order1);
  customer1.orders.push(order2);

  const result = await customer1.save();
  console.log(result);
};

const addOrder = async () => {
  const result = await Order.insertMany([
    {
      item: "pizza",
      price: 499,
    },
    {
      item: "samosa",
      price: 12,
    },
  ]);

  console.log(result);
};

const findCustomer = async () => {
  const result = await Customer.findOne({ name: "karan" }).populate("orders");
  console.log(result);
};

const deleteCustomer = async () => {
  const deletedCustomer = await Customer.findByIdAndDelete(
    "68bfc784ed21fc655ce5f00b"
  );
};

// addOrder();
// addCustomer();
// findCustomer();
deleteCustomer();
