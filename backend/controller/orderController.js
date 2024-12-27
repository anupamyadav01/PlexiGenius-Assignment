export const placeOrder = async (req, res) => {
  try {
    return res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    console.error("Error in placeOrder: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const shipOrder = async (req, res) => {
  try {
    return res.status(200).json({ message: "Order shipped successfully" });
  } catch (error) {
    console.error("Error in shipOrder: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const confirmOrder = async (req, res) => {
  try {
    return res.status(200).json({ message: "Order confirmed successfully" });
  } catch (error) {
    console.error("Error in confirmOrder: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const outForDelivery = async (req, res) => {
  try {
    return res.status(200).json({ message: "Order is out for delivery" });
  } catch (error) {
    console.error("Error in outForDelivery: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const delivered = async (req, res) => {
  try {
    return res.status(200).json({ message: "Order delivered successfully" });
  } catch (error) {
    console.error("Error in delivered: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
