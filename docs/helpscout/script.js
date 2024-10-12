import { readdir, stat } from "fs/promises";
import { join, parse } from "path";
import { fileURLToPath } from "url";

async function processHelpScoutFolder(rootDir) {
  const result = [];
  const folders = await readdir(rootDir);

  for (const folder of folders) {
    const folderPath = join(rootDir, folder);
    if ((await stat(folderPath)).isDirectory()) {
      const group = folder
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      const pages = [];

      const articles = await readdir(folderPath);
      for (const article of articles) {
        if ((await stat(join(folderPath, article))).isFile()) {
          const articleName = parse(article).name;
          pages.push(`helpscout/${folder}/${articleName}`);
        }
      }

      result.push({
        group: group,
        pages: pages,
      });
    }
  }

  return result;
}

async function main() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = parse(__filename).dir;
  const helpscoutDir = __dirname;
  const output = await processHelpScoutFolder(helpscoutDir);
  console.log(JSON.stringify(output, null, 2));
}

main().catch(console.error);
