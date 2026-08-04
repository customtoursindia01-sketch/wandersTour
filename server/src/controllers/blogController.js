import BlogPost from "../models/BlogPost.js";
import { createCrudController } from "./crudControllerFactory.js";

export default createCrudController(BlogPost, { defaultSort: "-publishedOn" });
