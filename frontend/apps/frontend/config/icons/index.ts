import ant from './icon.ant';
import ion from './icon.ion';
import ri from './icon.ri';

import iconData, { iconMap as tempIconMap, toCase } from './icon';

const { REACT_APP_ENV = 'dev' } = process.env;
const isDevelopment = REACT_APP_ENV !== 'dev';

const finalIconMap = isDevelopment
  ? {
      [toCase('ant-design')]: ant,
      [toCase('ion')]: ion,
      [toCase('ri')]: ri,
    }
  : tempIconMap;

const finalIconData = isDevelopment ? [...ant, ...ion, ...ri] : iconData;

console.log('icon count ===>', finalIconData.length);

export const iconMap = finalIconMap;
export default finalIconData;
