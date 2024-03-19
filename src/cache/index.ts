import NodeCache from "node-cache";

const cahe = new NodeCache();

export async function cacheMiddleware(
  key: string,
  dbFunction: Function,
  expire: number = 60
) {
  let data;
  if (cahe.has(key)) {
    data = JSON.parse(String(cahe.get(key)) ?? null);
  } else {
    const dbData = await dbFunction();
    if (dbData === null || dbData === undefined) {
      return;
    }
    cahe.set(key, JSON.stringify(dbData), expire);
    data = dbData;
  }

  return data;
}

export function clearCache(key: string) {
  if (cahe.has(key)) {
    cahe.del(key);
  }
}
