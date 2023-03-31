import { initModels } from '@/db/models/mysql/init-models';
import { mysqlSequelize } from '@/db';

Object.values(initModels(mysqlSequelize)).forEach((model) => model['sync']());
