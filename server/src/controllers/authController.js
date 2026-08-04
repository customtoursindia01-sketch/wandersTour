import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const generateToken = (adminId) =>
  jwt.sign({ id: adminId }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() }).select("+password");

    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      token: generateToken(admin._id),
      admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentAdmin = async (req, res) => {
  res.json({
    id: req.admin._id,
    name: req.admin.name,
    email: req.admin.email,
    role: req.admin.role,
  });
};
