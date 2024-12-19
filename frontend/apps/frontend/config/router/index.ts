import fs from 'fs';
import path from 'path';

const modulesDir = __dirname;
const files = fs.readdirSync(modulesDir);

const routes = files
  .filter((file) => file !== 'index.ts' && file.endsWith('.ts'))
  .map((file) => {
    const modulePath = path.join(modulesDir, file);
    return require(modulePath).default;
  });

export default routes;
