import SiteSettings from "../models/SiteSettings.js";

export const getSettings = async (req, res, next) => {
  try {
    const settings = await SiteSettings.findOneAndUpdate(
      { key: "site-settings" },
      {},
      { upsert: true, new: true }
    );
    res.json(settings);
  } catch (error) {
    next(error);
  }
};

export const updateSettings = async (req, res, next) => {
  try {
    const settings = await SiteSettings.findOneAndUpdate(
      { key: "site-settings" },
      req.body,
      { upsert: true, new: true, runValidators: true }
    );
    res.json(settings);
  } catch (error) {
    next(error);
  }
};
