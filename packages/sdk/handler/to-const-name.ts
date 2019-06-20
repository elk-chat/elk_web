export default function (name: string) {
  let nextName = name;
  nextName = nextName.replace(/([A-Z])([a-z]*)/g, (match, p1, p2, offset, string) => {
    // console.log(match, p1, p2, offset, string);
    return `${match.toUpperCase()}_`;
  });
  nextName = nextName.slice(0, nextName.length - 1);
  return nextName;
}
