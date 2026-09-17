async function run() {
  try {
    const res = await fetch('http://localhost:3000');
    const html = await res.text();
    const matches = [...html.matchAll(/href="(\/_next\/static\/css\/[^"]+)"/g)].map(m => m[1]);
    console.log('CSS files found:', matches);
    for (const href of matches) {
      const cssRes = await fetch('http://localhost:3000' + href);
      const css = await cssRes.text();
      console.log(href, 'size:', css.length);
      const idx = css.indexOf('max-w-7xl');
      if (idx !== -1) {
        console.log('Found max-w-7xl at index:', idx);
        console.log('Rule:', css.slice(Math.max(0, idx - 30), idx + 100));
      } else {
        console.log('max-w-7xl NOT found in', href);
      }
    }
  } catch (e) {
    console.error(e);
  }
}
run();
