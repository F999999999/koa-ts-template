type DisposeFn<T> = (data: T[]) => { sql: string; payload: T[] };

// 生成批量插入SQL语句
export const sqlBatchInsert = (
  tableName: string,
  data: any[] = [],
  dispose: object = {}
) => {
  if (data.length === 0) return { sql: [], payload: [[]] };
  // SQL拼接处理
  const disposeFn: DisposeFn<keyof typeof data> = (data) => {
    const payload = [];
    return {
      sql: data.reduce((prev, curr, index, arr) => {
        const keys = Object.keys(curr);
        const values = Object.values(curr);
        payload.push(
          ...values.map((value, i) =>
            dispose[keys[i]] ? dispose[keys[i]](value) : value
          )
        );
        return (
          prev +
          values.reduce(
            (p, _c, i, a) =>
              p +
              (i < a.length - 1
                ? "?,"
                : index < arr.length - 1
                ? "?),"
                : "?);"),
            "("
          )
        );
      }, `INSERT INTO ${tableName}(${Object.keys(data[0]).join()}) VALUES `),
      payload,
    };
  };
  // 拼接结果
  const result: { sql: string[]; payload: (keyof typeof data)[][] } = {
    sql: [],
    payload: [],
  };
  // 每次最多插入数量
  const maxSqlLength = Math.floor(65536 / Object.keys(data[0]).length) - 1;
  // 生成插入语句
  for (let i = 0; i < data.length / maxSqlLength; i++) {
    const { sql, payload } = disposeFn(
      data.slice(i * maxSqlLength, (i + 1) * maxSqlLength)
    );
    result.sql.push(sql);
    result.payload.push(payload);
  }
  return result;
};
