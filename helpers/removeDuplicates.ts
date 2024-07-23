export default function removeDuplicates(arr : Array<string>) {
  const map : Map<string, number> = new Map()
  arr.forEach((element: string) => {
    let count = map.get(element);
    if(count === undefined) map.set(element, 1);
    else map.set(element, count + 1);
  });
  let new_arr = []
  map.forEach((value, key) => {
    new_arr.push({
      name: key,
      count: value
    })
  })
  return new_arr;
}