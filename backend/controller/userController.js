export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
  } catch (error) {
    console.log("Error in registerUser: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {};

export const logoutUser = async (req, res) => {};

export const resetPassword = async (req, res) => {};
