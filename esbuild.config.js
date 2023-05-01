import esbuild from "esbuild";
import fs from "fs";

const dist = esbuild.buildSync({
  entryPoints: ["./src/apps/app.tsx"],
  bundle: true,
  minify: true,
  write: false,
  format: "esm",
});

const htmlFormat = `
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Paparazzi</title>
  </head>
  <body>
    <main id="app"></main>
    <script>${dist.outputFiles[0].text}</script>
  </body>
</html>
`;

fs.writeFileSync("./src/google-apps-script/index.html", htmlFormat);
