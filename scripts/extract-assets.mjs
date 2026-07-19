// One-off script: pulls the real photos already embedded (as base64) inside
// the approved design reference `AmazonBio Atlas Home.html` and writes them
// out as plain PNG files so the React app can import them normally.
// Run once with: node scripts/extract-assets.mjs
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { gunzipSync, inflateSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const bundlePath = path.join(root, 'AmazonBio Atlas Home.html');
const outDir = path.join(root, 'src', 'assets', 'images');

const ASSETS = {
  '5820e9cc-470b-49e4-b5ff-21944ea87f46': 'logo.png',
  '9c5fe195-7013-4273-bf99-3bc17df5a5a9': 'hero-bg.png',
  'ee10761b-d206-4b1d-9d83-98ef5fecfe78': 'sp-unha.png',
  'c62976bd-05de-4340-aee5-80b886b9a4fc': 'sp-andiroba.png',
  '9ef11a06-4241-43aa-9a4a-1cbf9b1b2143': 'sp-copaiba.png',
  'e3ec3044-a7aa-477d-97a0-65e60332ec1f': 'sp-jaborandi.png',
};

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47]);

function main() {
  console.log('Reading bundle (this is a large file, may take a moment)...');
  const html = readFileSync(bundlePath, 'utf8');

  const match = html.match(/<script type="__bundler\/manifest">([\s\S]*?)<\/script>/);
  if (!match) {
    throw new Error('Could not find __bundler/manifest script tag in the bundle.');
  }

  const manifest = JSON.parse(match[1]);
  mkdirSync(outDir, { recursive: true });

  const results = [];
  for (const [uuid, filename] of Object.entries(ASSETS)) {
    const record = manifest[uuid];
    if (!record) {
      throw new Error(`uuid ${uuid} not found in manifest`);
    }
    if (record.mime !== 'image/png') {
      throw new Error(`uuid ${uuid} has unexpected mime ${record.mime}`);
    }

    let buffer = Buffer.from(record.data, 'base64');
    if (record.compressed) {
      try {
        buffer = gunzipSync(buffer);
      } catch {
        buffer = inflateSync(buffer);
      }
    }

    if (!buffer.subarray(0, 4).equals(PNG_MAGIC)) {
      throw new Error(`decoded data for ${filename} does not start with PNG magic bytes`);
    }

    const outPath = path.join(outDir, filename);
    writeFileSync(outPath, buffer);
    results.push({ uuid, filename, bytes: buffer.length });
  }

  console.table(results);
  console.log(`Wrote ${results.length} images to ${outDir}`);
}

main();
