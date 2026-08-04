import Faq from "../models/Faq.js";
import { createCrudController } from "./crudControllerFactory.js";

export default createCrudController(Faq);
