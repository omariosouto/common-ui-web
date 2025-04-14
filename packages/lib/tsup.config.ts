import fs from 'fs';
import { defineConfig } from 'tsup'

const entry = fs
  .readdirSync('src')
  .filter((file) => file.endsWith('.ts') || file.endsWith('.tsx'))
  .map((file) => `src/${file}`);

const packageJSONExports = entry.reduce((fileExports, file) => {
  const isIndex = file.includes('index');
  const fileKey = isIndex
    ? "."
    : file
      .replace("src/", "./")
      .replace(".tsx", "")
      .replace(".ts", "");
  const fileValue = file
    .replace("src", "./dist")
    .replace(".tsx", ".js")
    .replace(".ts", ".js");

  return {
    ...fileExports,
    [fileKey]: fileValue,
  };
}, {});

const pkgJson = JSON.parse(
  fs.readFileSync('package.json', 'utf-8')
);
pkgJson.exports = packageJSONExports;
fs.writeFileSync(
  'package.json',
  JSON.stringify(pkgJson, null, 2),
  'utf-8'
);

export default defineConfig({
  // get all files ending with .ts or .tsx in the src directory
  entry,
  format: ['esm', 'cjs'],
  dts: true,
  outDir: 'dist',
  clean: true
});
