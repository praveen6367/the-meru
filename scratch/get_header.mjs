async function run() {
  const r = await fetch('http://localhost:3000');
  const text = await r.text();
  const idx = text.indexOf('id="shopify-section-header"');
  console.log(text.slice(idx - 100, idx + 800));
}
run();
