const jwt = require("jsonwebtoken");
const { User,UserAccess} = require("../schemas/user.js");

const SECRET = "mysecret";

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  if (user.status==="Deactive") {
    return res.status(401).json({ message: "User is Deactive" });
  }
  console.log(user,"user Deatils")
  const token = jwt.sign({ role: user.role }, SECRET, { expiresIn: "1h" });
  res.json({ username: user.username,userId:user._id, role: user.role, token });
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });

  } catch (error) {
    console.error("Error fetching users:", error.message);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching users",
      error: error.message,
    });
  }
};


exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("roleId");
    console.log(user,"User Acesss")
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Error fetching user", error: err.message });
  }
};

// Activate / Deactivate User
exports.updateUserStatus = async (req, res) => {
  try {
    const status = req.body.status;
    const id = req.body.user_id
    console.log(id,status)
    if (!["Active", "Deactive"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value. Use 'Active' or 'Deactive'." });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { status:status, last_active: new Date() }, 
      { new: true } 
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: `User status updated to ${status}`,
      user: {
        id: user._id,
        username: user.username,
        status: user.status,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating user status", error: err.message });
  }
};

