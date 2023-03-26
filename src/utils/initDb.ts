import { initModels } from "@/db/models/init-models";
import { sequelize } from "@/db";

Object.values(initModels(sequelize)).forEach((model) => model["sync"]());
