const antDesign = require('@iconify-json/ant-design/icons.json');
const fa6Solid = require('@iconify-json/fa6-solid/icons.json');
const ion = require('@iconify-json/ion/icons.json');
const logos = require('@iconify-json/logos/icons.json');
const ri = require('@iconify-json/ri/icons.json');
const simpleIcons = require('@iconify-json/simple-icons/icons.json');

// 工具函数：将类似 ant-design 转换成 Ant Design
export const toCase = (str: string) =>
  str
    .toLowerCase()
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const transform = (data: any) => Object.keys(data.icons).map((icon) => `${data.prefix}:${icon}`);

export const iconMap = {
  [toCase('ant-design')]: transform(antDesign),
  // [toCase(('fa6-solid'))]: transform(fa6Solid),
  // [toCase('ion')]: transform(ion),
  // [toCase(('logos'))]: transform(logos),
  // [toCase(('ri'))]: transform(ri),
  // [toCase(('simple-icons'))]: transform(simpleIcons),
} as const;

const iconList = Object.values(iconMap).flat();

export default iconList;
