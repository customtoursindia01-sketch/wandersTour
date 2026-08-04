/**
 * Factory that generates standard REST controller functions for a given
 * Mongoose model. Used to avoid duplicating identical CRUD logic across
 * Tours, Destinations, Themes, Guides, Testimonials, Blog posts and FAQs.
 *
 * `publicFilter` lets public (non-admin) list endpoints hide unpublished
 * records, while the admin panel always sees everything.
 */
export const createCrudController = (Model, { defaultSort = "order -createdAt" } = {}) => {
  const getAll = async (req, res, next) => {
    try {
      const isAdminRequest = Boolean(req.admin);
      const filter = isAdminRequest ? {} : { isPublished: true };
      const items = await Model.find(filter).sort(defaultSort);
      res.json(items);
    } catch (error) {
      next(error);
    }
  };

  const getOne = async (req, res, next) => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) return res.status(404).json({ message: "Not found" });
      res.json(item);
    } catch (error) {
      next(error);
    }
  };

  const create = async (req, res, next) => {
    try {
      const item = await Model.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  };

  const update = async (req, res, next) => {
    try {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!item) return res.status(404).json({ message: "Not found" });
      res.json(item);
    } catch (error) {
      next(error);
    }
  };

  const remove = async (req, res, next) => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) return res.status(404).json({ message: "Not found" });
      res.json({ message: "Deleted successfully" });
    } catch (error) {
      next(error);
    }
  };

  return { getAll, getOne, create, update, remove };
};
