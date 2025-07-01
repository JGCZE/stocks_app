const isNullish = (value: unknown): boolean => (value ?? null) === null;

const removeEmpty = <T extends object>(obj: T, isArray = false): Partial<T> => {
  const reducedObject = (Object.keys(obj) as Array<keyof T>).reduce(
    (result, key) => {
      if (!isNullish(obj[key])) {
        if (Array.isArray(obj[key])) {
          const tmpArray = obj[key];
          result[key] = removeEmpty(
            tmpArray as object,
            true
          ) as typeof tmpArray;
        } else if (typeof obj[key] === "object") {
          const tmpObject = obj[key];
          result[key] = removeEmpty(tmpObject as object) as typeof tmpObject;
        } else {
          result[key] = obj[key];
        }
      }

      return result;
    },
    (isArray ? [] : {}) as Required<T>
  );

  return reducedObject;
};

export default removeEmpty;
