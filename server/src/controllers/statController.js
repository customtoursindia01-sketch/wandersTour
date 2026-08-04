import Stat from "../models/Stat.js";

export const getStats = async (req, res, next) => {
  try {
    const stats = await Stat.findOneAndUpdate({ key: "site-stats" }, {}, { upsert: true, new: true });
    res.json(stats);
  } catch (error) {
    next(error);
  }
};

export const updateStats = async (req, res, next) => {
  try {
    const stats = await Stat.findOneAndUpdate({ key: "site-stats" }, req.body, {
      upsert: true,
      new: true,
      runValidators: true,
    });
    res.json(stats);
  } catch (error) {
    next(error);
  }
};
