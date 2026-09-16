import fs from 'node:fs';
import path from 'node:path';

const root = path.dirname(new URL(import.meta.url).pathname);
const read = f => fs.readFileSync(path.join(root, f), 'utf8');
const c = JSON.parse(read('content.json'));
const css = read('src/site.css');
const logoH = read('src/logo-horizontal-white.svg');
const logoS = read('src/logo-stacked-white.svg');
const esc = s => String(s ?? '').replace(/&(?!#?\w+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const nav = c.nav.map(n => `<li><a href="#${esc(n.anchor)}">${esc(n.label)}</a></li>`).join('\n    ');
const navFoot = c.nav.map(n => `<a href="#${esc(n.anchor)}">${esc(n.label)}</a>`).join('');
const roles = c.network.roles.map(r => `<div>${esc(r)}</div>`).join('');
const blocks = c.what.blocks.map(b =>
  `<div class="cap"><span class="idx">${esc(b.index)}</span><h3>${esc(b.title)}</h3><p>${esc(b.text)}</p></div>`).join('\n      ');
const steps = c.how.steps.map(s =>
  `<div class="step"><div class="n">${esc(s.index)}</div><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div>`).join('\n      ');
const cells = c.focus.cells.map(f => `<div><h4>${esc(f.title)}</h4><p>${esc(f.text)}</p></div>`).join('');
const panel = c.contact.panel_items.map(i =>
  `<div class="pitem"><span class="pn">${esc(i.index)}</span><div><h4>${esc(i.title)}</h4><p>${esc(i.text)}</p></div></div>`).join('\n      ');

const html = `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(c.site.title)}</title>
<meta name="description" content="${esc(c.site.description)}">
<link rel="canonical" href="${esc(c.site.url)}">
<meta property="og:title" content="${esc(c.site.title)}">
<meta property="og:description" content="${esc(c.site.description)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${esc(c.site.url)}">
<meta property="og:image" content="${esc(c.site.url)}/assets/icons/og-image-1200x630.png">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/icons/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/icon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/icons/icon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/icon-180.png">
<link rel="mask-icon" href="/assets/icons/safari-pinned-tab.svg" color="#0B1D2C">
<meta name="theme-color" content="#0B1D2C">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;600&family=EB+Garamond:ital,wght@0,400;1,400&display=swap" rel="stylesheet">
<style>${css}</style></head>
<body>

<header class="nav" id="nav"><div class="wrap">
  <a href="#top" aria-label="Vianet Capital home">${logoH}</a>
  <nav><ul>
    ${nav}
  </ul></nav>
  <button class="burger" aria-label="Menu"><span></span><span></span><span></span></button>
</div></header>

<main id="top">

<section class="hero">
  <div class="hero-media"><img src="${esc(c.hero.image)}" alt=""></div>
  <div class="wrap">
    <p class="eyebrow reveal" style="color:#8FA0AE">${esc(c.hero.eyebrow)}</p>
    <h1 class="reveal d1">${esc(c.hero.headline)}</h1>
    <p class="lede reveal d2">${esc(c.hero.lede)}</p>
    <a class="ghost reveal d3" href="#contact">${esc(c.hero.button)}</a>
  </div>
</section>

<section id="approach">
  <div class="wrap two">
    <div><p class="eyebrow">${esc(c.premise.eyebrow)}</p></div>
    <div>
      <h2 class="statement statement--wide">${esc(c.premise.statement)}</h2>
      <p class="lead" style="margin-top:36px">${esc(c.premise.supporting)}</p>
    </div>
  </div>
</section>

<section class="panel" id="network">
  <div class="wrap">
    <p class="eyebrow">${esc(c.network.eyebrow)}</p>
    <h2 class="statement">${esc(c.network.heading)}</h2>
    <div class="roles">${roles}</div>
    <div class="two" style="margin-top:52px">
      <p style="font-size:19px;max-width:52ch">${esc(c.network.paragraph)}</p>
      <p class="lead">${esc(c.network.supporting)}</p>
    </div>
  </div>
</section>

<section class="panel" id="what">
  <div class="wrap">
    <p class="eyebrow">${esc(c.what.eyebrow)}</p>
    <h2 class="statement">${esc(c.what.heading)}</h2>
    <div class="caps">
      ${blocks}
    </div>
  </div>
</section>

<section class="band">
  <img src="${esc(c.band.image)}" alt="">
  <div class="band-inner"><p>${esc(c.band.quote_line_1)}<br>${esc(c.band.quote_line_2)}</p></div>
</section>

<section class="dark on-dark" id="how">
  <div class="wrap">
    <p class="eyebrow">${esc(c.how.eyebrow)}</p>
    <h2 class="statement">${esc(c.how.heading)}</h2>
    <div class="steps">
      ${steps}
    </div>
  </div>
</section>

<section id="focus">
  <div class="wrap two">
    <div><p class="eyebrow">${esc(c.focus.eyebrow)}</p>
      <h2 class="statement" style="font-size:clamp(24px,2.6vw,34px)">${esc(c.focus.heading)}</h2></div>
    <div class="focus">${cells}</div>
  </div>
</section>

<section class="taglineband">
  <div class="wrap">
    <p class="tag">${esc(c.tagline.before)}<b>${esc(c.tagline.via)}</b>${esc(c.tagline.middle)}<span class="nb"><b>${esc(c.tagline.net)}</b>${esc(c.tagline.after).split(' ')[0]}</span> ${esc(c.tagline.after).split(' ').slice(1).join(' ')}</p>
    <p class="triad">${esc(c.tagline.triad)}</p>
  </div>
</section>

<section class="contact" id="contact">
  <div class="wrap two">
    <div>
      <p class="eyebrow">${esc(c.contact.eyebrow)}</p>
      <h2 class="statement">${esc(c.contact.heading)}</h2>
      <p class="lead" style="margin-top:30px">${esc(c.contact.supporting)}</p>
      <p style="margin-top:44px;font-size:15px;color:#AEBDC9">
        <a href="mailto:${esc(c.site.email)}">${esc(c.site.email)}</a><br>
        ${esc(c.contact.offices)}<br>
        <span style="color:#7E8F9C;font-size:14px">${esc(c.contact.reach)}</span>
      </p>
    </div>
    <div class="cpanel">
      <p class="eyebrow">${esc(c.contact.panel_title)}</p>
      ${panel}
      <a class="cmail" href="mailto:${esc(c.site.email)}">${esc(c.contact.panel_cta)} — ${esc(c.site.email)}</a>
    </div>
  </div>
</section>
</main>

<footer><div class="wrap">
  <div class="top">
    <div>${logoS}</div>
    <nav>${navFoot}</nav>
  </div>
  <div class="bottom">
    <span>${esc(c.footer.legal)}</span>
    <span class="legal"><a href="privacy.html">Privacy</a><a href="terms.html">Terms</a>
      <span>${esc(c.footer.right)}</span></span>
  </div>
</div></footer>

<script>
const nav=document.getElementById('nav');
const onScroll=()=>nav.classList.toggle('solid',window.scrollY>60);
onScroll();addEventListener('scroll',onScroll,{passive:true});
</script>
</body></html>`;

fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
fs.writeFileSync(path.join(root, 'dist/index.html'), html);
// copy static
const cp = (src, dest) => {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.cpSync(src, dest, { recursive: true });
};
cp(path.join(root, 'assets'), path.join(root, 'dist/assets'));
cp(path.join(root, 'admin'), path.join(root, 'dist/admin'));
for (const f of ['privacy.html', 'terms.html', 'robots.txt', 'sitemap.xml']) {
  const p = path.join(root, 'static', f);
  if (fs.existsSync(p)) fs.copyFileSync(p, path.join(root, 'dist', f));
}
console.log('built dist/index.html —', (html.length / 1024).toFixed(0), 'KB');
