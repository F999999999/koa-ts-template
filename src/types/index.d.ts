type ModelFunction<T, U = import("mysql2").ResultSetHeader> = (
  payload: T,
  conn?: import("mysql2").PoolConnection
) => Promise<U>;
