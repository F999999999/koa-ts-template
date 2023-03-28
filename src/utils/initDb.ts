import { initModels } from "@/db/models/init-models";
import { mysqlSequelize } from "@/db";

Object.values(initModels(mysqlSequelize)).forEach((model) => model["sync"]());
