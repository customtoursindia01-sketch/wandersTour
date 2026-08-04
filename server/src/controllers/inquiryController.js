import Inquiry from "../models/Inquiry.js";

// Public: submitted by visitors via the "Plan Your Custom Itinerary" form.
export const createInquiry = async (req, res, next) => {
  try {
    const { fullName, email } = req.body;
    if (!fullName || !email) {
      return res.status(400).json({ message: "Full name and email are required" });
    }
    const inquiry = await Inquiry.create(req.body);
    res.status(201).json(inquiry);
  } catch (error) {
    next(error);
  }
};

// Admin only from here down.
export const getInquiries = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find().sort("-createdAt");
    res.json(inquiries);
  } catch (error) {
    next(error);
  }
};

export const updateInquiryStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!inquiry) return res.status(404).json({ message: "Not found" });
    res.json(inquiry);
  } catch (error) {
    next(error);
  }
};

export const deleteInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    next(error);
  }
};
