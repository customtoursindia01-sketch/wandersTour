import { protectAdmin } from "../middlewares/auth.js";

/**
 * Mounts standard public + admin REST endpoints for a resource on the given
 * Express app, backed by a controller created with createCrudController().
 *
 *   GET    /api/{resource}          -> public, published items only
 *   GET    /api/{resource}/:id      -> public, single item
 *   GET    /api/admin/{resource}    -> admin (JWT), all items incl. drafts
 *   POST   /api/admin/{resource}    -> admin, create
 *   PUT    /api/admin/{resource}/:id-> admin, update
 *   DELETE /api/admin/{resource}/:id-> admin, delete
 */
export const registerCrudRoutes = (app, resource, controller) => {
  app.get(`/api/${resource}`, controller.getAll);
  app.get(`/api/${resource}/:id`, controller.getOne);

  app.get(`/api/admin/${resource}`, protectAdmin, controller.getAll);
  app.post(`/api/admin/${resource}`, protectAdmin, controller.create);
  app.put(`/api/admin/${resource}/:id`, protectAdmin, controller.update);
  app.delete(`/api/admin/${resource}/:id`, protectAdmin, controller.remove);
};
