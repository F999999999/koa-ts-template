import { initModels } from '@/db/mysql/models/init-models';
import { mysqlSequelize } from '@/db';

Object.values(initModels(mysqlSequelize)).forEach((model) => model['sync']());
