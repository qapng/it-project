export function formatDate(date) {
  // takes in date of this format: YYYY-MM-DDTHOUR:MIN:SECZ
  // and return it in this format: DD-MM-YYYY
  const day = date.slice(8, 10);
  const month = date.slice(5, 7);
  const year = date.slice(0, 4);

  return `${day}-${month}-${year}`;
}
