const gradientColorMapper: object = {
  red: 'linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%)',
  green: 'linear-gradient(120deg, #2af598 0%, #009efd 100%)',
  blue: 'radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%)',
  wine: 'linear-gradient(120deg, #f093fb 0%, #f5576c 100%)',
  purple: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
};
const gradientColorFilter = (color: string) => gradientColorMapper[color] || color;

export default gradientColorFilter;
export {
  gradientColorMapper
};
