import { initModels } from "@/db/sequelize/models/init-models";
import { sequelize } from "@/db/sequelize";

Object.values(initModels(sequelize)).forEach((model) => model["sync"]());
