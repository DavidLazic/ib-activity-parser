export const formatFraction = (num, { min, max } = { min: 2, max: 2 }) =>
  Number(num).toLocaleString('fullwide', {
    maximumFractionDigits: max,
    minimumFractionDigits: min,
  });

export const formatDate = (value) =>
  (value ? new Date(value) : new Date()).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
