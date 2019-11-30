interface IForEachAsync<P = any, R = any> {
  (input: P[], callback: (arg: P) => Promise<R>): Promise<R[]>;
}

export const forEachAsync: IForEachAsync = async (input, callback) => {
  const n = input.length;
  const results = [];
  for (var i = 0; i < n; i++) {
    const result = await callback(input[i]);
    results.push(result);
  }
  return results;
};
