import { chmodSync, copyFileSync } from "node:fs";
import { build } from "esbuild";

// Git-backed plugin installs do not install npm dependencies.
await build({
	entryPoints: ["src/cli.ts"],
	outfile: "dist/cli.js",
	bundle: true,
	platform: "node",
	format: "esm",
	target: "node20",
	// Picomatch's CommonJS code requires Node built-ins inside the ESM bundle.
	banner: {
		js: 'import { createRequire } from "node:module"; const require = createRequire(import.meta.url);',
	},
});
chmodSync("dist/cli.js", 0o755);
copyFileSync("node_modules/picomatch/LICENSE", "dist/picomatch.LICENSE");
