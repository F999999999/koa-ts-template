import { mysqlSequelize } from '@/db/index';
import { initModels as mysqlInitModels } from '@/db/models/mysql/init-models';

export const loadMysqlModels = () => mysqlInitModels(mysqlSequelize);
