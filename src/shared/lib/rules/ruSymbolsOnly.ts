export const ruSymbolsOnly = (val: string) => {
  const trimmed = val.trim();
  if (/^[А-Яа-я\-\s]+$/g.test(trimmed)) {
    return true;
  }
  return 'Only russian symbols are allowed';
};
