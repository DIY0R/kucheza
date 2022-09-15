export const randomId = (fnChekc: (id: number) => boolean): number => {
  const id = Math.floor(Math.random() * 1000);
  if (fnChekc(id)) return randomId(fnChekc);
  return id;
};
