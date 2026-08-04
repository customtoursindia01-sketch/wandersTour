import Guide from "../models/Guide.js";
import { createCrudController } from "./crudControllerFactory.js";

export default createCrudController(Guide);
