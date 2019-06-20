import ToConstName from './to-const-name';
import SigMethodMapper from './method-sig-mapper';

function getSigMapper(method: string) {
  const methodMapper = `SIG_${ToConstName(method)}`;
  const res = SigMethodMapper[methodMapper];
  if (!res) console.error('找不到对应的 sig');
  return res;
}

export default getSigMapper;
export {
  SigMethodMapper
};
