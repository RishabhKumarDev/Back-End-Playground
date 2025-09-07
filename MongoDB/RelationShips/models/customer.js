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

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

const addCustomer = async () => {
  const customer1 = new Customer({
    name: "haddi kala",
  });

  let order1 = await Order.findOne({ item: "sofa" });
  let order2 = await Order.findOne({ item: "drone" });

  customer1.orders.push(order1);
  customer1.orders.push(order2);

  const result = await customer1.save();
  console.log(result);
};

const addOrder = async () => {
  const result = await Order.insertMany([
    {
      item: "phone",
      price: 49999,
    },
    {
      item: "drone",
      price: 12999,
    },
    {
      item: "sofa",
      price: 29999,
    },
  ]);

  console.log(result);
};
 
const findCustomer = async()=>{
    const result = await Customer.findOne({}).populate("orders");
    console.log(result);
}

// addOrder();
// addCustomer();
findCustomer();
