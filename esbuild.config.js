import esbuild from "esbuild";
import fs from "fs";

const path = { dist: "./dist", apps: "./src/apps" };

function main() {
  if (process.argv.length >= 4) buildError();
  switch (process.argv[2]) {
    case "-w":
      watch();
      return;

    case undefined:
      build();
      return;

    default:
      buildError();
      return;
  }
}
main();

function build() {
  const artifacts = esbuild.buildSync({
    entryPoints: [`${path.apps}/app.tsx`],
    bundle: true,
    minify: true,
    write: false,
    format: "esm",
  });

  const template = fs.readFileSync(`${path.apps}/index.html`, "utf-8");
  const regex = new RegExp("\\/\\* script \\*\\/", "g");
  const dist = template.replace(regex, artifacts.outputFiles[0].text);

  !fs.existsSync("./dist") && fs.mkdirSync(path.dist);
  fs.writeFileSync(`${path.dist}/index.html`, dist);
}

function buildError() {
  throw new Error(
    "Paparazzi Build Command needs 1 optional argument. ['-w' | undefined]"
  );
}

function watch() {
  console.log(`watching...`);
  fs.watch(
    `${path.apps}/`,
    { persistent: true, recursive: true },
    (event, filename) => {
      console.log(`📸${event}: ${filename}`);
      build();
    }
  );
}
