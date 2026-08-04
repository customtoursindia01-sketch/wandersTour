import Testimonial from "../models/Testimonial.js";
import { createCrudController } from "./crudControllerFactory.js";

export default createCrudController(Testimonial);
