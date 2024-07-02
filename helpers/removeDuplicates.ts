export default function removeDuplicates(arr : Array<string>) {
  let unique = [];
  arr.forEach((element: string) => {
    if (!unique.includes(element)) {
      unique.push(element);
    }
  });
  return unique;
}