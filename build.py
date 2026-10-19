#!/usr/bin/env python3
"""Genera dist/ (ES en / y EN en /en/) a partir de src/.

  python3 build.py           prototipo: noindex y avisos si falta el inglés
  python3 build.py --prod    producción: indexable y sin marcadores pendientes

Comprobaciones: claves sin traducir, {{...}} sin resolver, [PLACEHOLDER] y [BOOKINGS_URL]
en producción, y que cada cifra del copy esté en src/cifras.toml (con la misma cifra en ES y EN).

Bloques condicionales en la plantilla: <!--si:nombre ...--> ... <!--/si--> se quita entero si dentro
queda un [PLACEHOLDER] (así los testimonios solo se publican cuando son reales).
En el copy, {mail} se sustituye por MAIL.
"""
import html, json, os, re, shutil, sys, tomllib, urllib.parse
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC, DIST = ROOT / 'src', Path(os.environ.get('SP_DIST', ROOT / 'dist'))   # SP_DIST: otra carpeta de salida (pruebas)
PROD = '--prod' in sys.argv
SITE = 'https://spiralia.es/ia/' if PROD else 'https://spiralia-ia.vercel.app/'   # producción: carpeta en Nominalia; prototipo: Vercel
BOOKINGS = '[BOOKINGS_URL]'                       # página de Microsoft Bookings (mejor una de equipo)
MAIL = 'ana.iza@spiralia.es'                      # email de contacto de toda la página; cambiarlo aquí basta
ANALYTICS = ''                                    # dominio en Plausible (sin cookies, UE); vacío = sin medición
ANALYTICS_SRC = 'https://plausible.io/js/script.js'
LANGS = {'es': '', 'en': 'en/'}
errors, warns = [], []

content = tomllib.loads((SRC / 'content.toml').read_text())
cifras = tomllib.loads((SRC / 'cifras.toml').read_text())['c']
data = content.pop('data')

def pick(v, lang, key):
    if not isinstance(v, dict) or 'es' not in v:
        return v
    out = v.get(lang)
    if out in ('', [], None):
        if lang != 'es':
            (errors if PROD else warns).append(f'sin traducir ({lang}): {key}')
        out = v['es']
    return out

def localize(x, lang, key='data'):
    if isinstance(x, dict):
        if 'es' in x and set(x) - {'es', 'en'} <= {'app'}:
            v = pick(x, lang, key)
            return {'t': v, 'app': x['app']} if 'app' in x else v
        return {k: localize(v, lang, f'{key}.{k}') for k, v in x.items()}
    if isinstance(x, list):
        return [localize(v, lang, f'{key}[{i}]') for i, v in enumerate(x)]
    return x

def texts(lang):
    t = {f'{s}.{k}': pick(v, lang, f'{s}.{k}') for s, sec in content.items() for k, v in sec.items()}
    return {k: v.replace('{mail}', MAIL) if isinstance(v, str) else v for k, v in t.items()}

plain = lambda v: html.unescape(re.sub(r'<[^>]+>', '', str(v)))

def jsonld(t, url):
    """Datos estructurados: la organización, el servicio y las preguntas del comité (Google y buscadores con IA)."""
    org = {'@type': 'Organization', '@id': SITE + '#org', 'name': 'Spiralia', 'url': 'https://spiralia.es/',
           'logo': SITE + 'assets/img/spiralia.svg', 'sameAs': ['https://www.linkedin.com/company/spiralia/']}
    srv = {'@type': 'Service', 'name': plain(t['meta.title']), 'description': plain(t['meta.description']),
           'serviceType': plain(t['ft.tag']), 'provider': {'@id': SITE + '#org'}, 'url': url,
           'areaServed': {'@type': 'Country', 'name': 'España'},
           'audience': {'@type': 'BusinessAudience', 'audienceType': plain(t['fmt.r_para'])},
           'hasOfferCatalog': {'@type': 'OfferCatalog', 'name': plain(t['fmt.kicker']), 'itemListElement': [
               {'@type': 'Offer', 'itemOffered': {'@type': 'Service', 'name': plain(t[f'fmt.{k}_name']), 'description': plain(t[f'fmt.{k}_que'])}}
               for k in ('r', 'p', 'd')]}}
    qs = sorted((k for k in t if re.fullmatch(r'faq\.q\d+', k)), key=lambda k: int(k[5:]))
    faq = {'@type': 'FAQPage', 'mainEntity': [{'@type': 'Question', 'name': plain(t[q]),
           'acceptedAnswer': {'@type': 'Answer', 'text': plain(t['faq.a' + q[5:]])}} for q in qs]}
    return json.dumps({'@context': 'https://schema.org', '@graph': [org, srv, faq]}, ensure_ascii=False,
                      separators=(',', ':')).replace('</', '<\\/')

SI = re.compile(r'<!--si:[^>]*-->(.*?)<!--/si-->', re.S)

NUM = re.compile(r'\d+(?:[.,]\d+)*')
norm = lambda s: re.sub(r'[.,\s]', '', s)
ALLOWED = {norm(c['valor']) for c in cifras}

def numbers(t):
    found = []
    for key, val in t.items():
        if key.split('.')[1].startswith('src') or key.endswith('_src'):
            continue
        plain = re.sub(r'<[^>]+>', ' ', str(val))
        for n in NUM.findall(plain):
            found.append(norm(n))
            if norm(n) not in ALLOWED:
                errors.append(f'cifra sin fuente en cifras.toml: «{n}» en {key}')
    return sorted(found)

def render(tpl, t, lang):
    other = 'en' if lang == 'es' else 'es'
    url = SITE + LANGS[lang]
    special = {
        'lang': lang, 'base': '../' if LANGS[lang] else '', 'other': ('../' if LANGS[lang] else 'en/'),
        'other_lang': other, 'canonical': url, 'url_es': SITE, 'url_en': SITE + 'en/',
        'robots': 'index,follow' if PROD else 'noindex,nofollow', 'mail': MAIL,
        'og_image': SITE + f'assets/og-{lang}.jpg',
        'data': json.dumps(localize(data, lang), ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/'),
        'jsonld': jsonld(t, url),
        'analytics': (f'<script defer data-domain="{ANALYTICS}" src="{ANALYTICS_SRC}"></script>\n'
                      '<script>window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)}</script>') if ANALYTICS else '',
    }
    def sub(m):
        mode, key = (m.group(1) or ''), m.group(2)
        if key in special:
            return special[key]
        if key not in t:
            errors.append(f'clave inexistente en la plantilla: {key}'); return m.group(0)
        v = str(t[key])
        if mode == 'attr:':
            return html.escape(re.sub(r'<[^>]+>', '', v), quote=True)
        if mode == 'url:':
            return urllib.parse.quote(re.sub(r'<[^>]+>', '', v))
        return v
    out = re.sub(r'\{\{(attr:|url:)?([\w.]+)\}\}', sub, tpl)
    out = SI.sub(lambda m: '' if '[PLACEHOLDER' in m.group(1) else m.group(1), out)
    for left in re.findall(r'\{\{[^}]*\}\}', out):
        errors.append(f'sin resolver: {left}')
    if PROD:
        for mark in ('[PLACEHOLDER', '[BOOKINGS_URL]'):
            if mark in out:
                errors.append(f'{lang}: queda «{mark}» en producción')
    return out

RESERVA = '''<!doctype html><html lang="es"><head><meta charset="utf-8">
<meta name="robots" content="noindex"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Hablemos · Spiralia AI</title><link rel="icon" href="../assets/img/favicon.svg" type="image/svg+xml">
<script>
// Cambia aquí la URL de Bookings sin volver a generar la web. Mientras no la haya, la página ofrece el email.
var BOOKINGS = "{bookings}";
if (BOOKINGS.indexOf("http") === 0) location.replace(BOOKINGS + location.search);
</script>
<style>
@font-face{{font-family:Butler;src:url(../assets/fonts/Butler-Light.woff2) format("woff2");font-weight:300}}
@font-face{{font-family:Sofia;src:url(../assets/fonts/SofiaSansCondensed.woff2) format("woff2");font-weight:100 900}}
*{{box-sizing:border-box}}html,body{{margin:0;min-height:100%;background:#051A2B;color:#E0DFDA;font:400 17px/1.6 system-ui,-apple-system,"Segoe UI",sans-serif}}
body{{min-height:100svh;display:grid;place-items:center;padding:24px;background:radial-gradient(60% 50% at 75% 20%,#0D3150,transparent 70%),#051A2B}}
main{{max-width:620px}}img{{display:block;width:120px;margin-bottom:48px}}
h1{{font:300 clamp(2.4rem,7vw,4rem)/1.02 Butler,Georgia,serif;letter-spacing:-.015em;margin:0 0 18px}}
p{{margin:0 0 14px;color:#A9B1B8}}ul{{margin:0 0 28px;padding-left:1.1em;color:#A9B1B8}}
.btn{{display:inline-flex;align-items:center;min-height:52px;padding:0 26px;border-radius:99px;background:#E0DFDA;color:#08263D;text-decoration:none;
  font:600 1.05rem/1 Sofia,"Arial Narrow",sans-serif;letter-spacing:.05em;margin:8px 12px 8px 0}}
.mail{{color:#E0DFDA}}button{{font:500 .9rem Sofia,sans-serif;letter-spacing:.05em;color:#A9B1B8;background:none;border:1px solid rgba(224,223,218,.3);border-radius:99px;padding:.3rem .8rem;cursor:pointer}}
a.volver{{display:inline-block;margin-top:36px;color:#A9B1B8;font:500 .95rem Sofia,sans-serif;letter-spacing:.06em}}
</style></head>
<body><main>
<img src="../assets/img/spiralia-blanco.svg" alt="Spiralia" width="120" height="29">
<h1 data-t="h"></h1><p data-t="p"></p><ul data-t="l"></ul>
<a class="btn" data-t="b" href="mailto:{mail}"></a>
<p><a class="mail" href="mailto:{mail}">{mail}</a> <button type="button" data-t="c"></button></p>
<a class="volver" data-t="v" href="../"></a>
</main>
<script>
var q = new URLSearchParams(location.search), en = q.get("l") === "en", d = q.get("d") || "web";
var T = en ? {{h: "Let\u2019s talk.", p: "Write to us and we\u2019ll suggest two or three slots for a 30-minute conversation with the team.",
  l: ["Your company and your role", "Where you are with AI today", "What you would like to solve first"], b: "Write the email", c: "Copy", k: "Copied", v: "\u2190 Back to Spiralia AI",
  s: "I\u2019d like to talk about AI with Spiralia"}}
 : {{h: "Hablemos.", p: "Escríbenos y te proponemos dos o tres huecos para una conversación de 30 minutos con el equipo.",
  l: ["Tu empresa y tu cargo", "Dónde está tu empresa con la IA", "Qué te gustaría resolver primero"], b: "Escribir el email", c: "Copiar", k: "Copiado", v: "\u2190 Volver a Spiralia AI",
  s: "Quiero hablar de IA con Spiralia"}};
document.documentElement.lang = en ? "en" : "es"; document.title = (en ? "Let\u2019s talk" : "Hablemos") + " · Spiralia AI";
var $ = function (k) {{ return document.querySelector("[data-t=" + k + "]"); }};
$("h").textContent = T.h; $("p").textContent = T.p; $("b").textContent = T.b; $("c").textContent = T.c; $("v").textContent = T.v;
$("l").innerHTML = T.l.map(function (x) {{ return "<li>" + x + "</li>"; }}).join("");
$("b").href = "mailto:{mail}?subject=" + encodeURIComponent(T.s + " · " + d);
if (en) $("v").href = "../en/";
$("c").onclick = function () {{ navigator.clipboard && navigator.clipboard.writeText("{mail}").then(function () {{ $("c").textContent = T.k; }}); }};
</script></body></html>
'''

def main():
    tpl = (SRC / 'index.template.html').read_text()
    if DIST.exists():
        shutil.rmtree(DIST)
    nums = {}
    for lang, sub in LANGS.items():
        t = texts(lang)
        nums[lang] = numbers(t)
        out = DIST / sub / 'index.html'
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(render(tpl, t, lang))
    if not warns and nums['es'] != nums['en']:
        errors.append('las cifras de ES y EN no coinciden')
    # Las fuentes se sirven en woff2 (tools/fonts.py); los OTF/TTF originales se quedan en el repo
    shutil.copytree(ROOT / 'assets', DIST / 'assets', ignore=shutil.ignore_patterns('.DS_Store', 'src-*', '*.otf', '*.ttf'))
    for d in ('css', 'js'):
        shutil.copytree(SRC / d, DIST / d)
    if PROD and not BOOKINGS.startswith('http'):
        errors.append('falta la URL de Microsoft Bookings (BOOKINGS en build.py)')
    (DIST / 'reserva').mkdir()
    (DIST / 'reserva/index.html').write_text(RESERVA.format(bookings=BOOKINGS, mail=MAIL))
    robots = 'index, follow' if PROD else 'noindex, nofollow'
    (DIST / 'vercel.json').write_text(json.dumps({'headers': [{'source': '/(.*)', 'headers': [
        {'key': 'X-Robots-Tag', 'value': robots}, {'key': 'X-Content-Type-Options', 'value': 'nosniff'}]}]}, indent=2))
    (DIST / '.htaccess').write_text(f'Header set X-Robots-Tag "{robots}"\nAddType font/otf .otf\nAddType font/ttf .ttf\n'
                                    'AddType video/mp4 .mp4\nAddType video/webm .webm\nAddType font/woff2 .woff2\n<IfModule mod_expires.c>\nExpiresActive On\n'
                                    'ExpiresByType font/woff2 "access plus 1 year"\nExpiresByType video/mp4 "access plus 1 month"\n'
                                    'ExpiresByType video/webm "access plus 1 month"\nExpiresByType image/webp "access plus 1 month"\n'
                                    'ExpiresByType image/jpeg "access plus 1 month"\nExpiresByType image/png "access plus 1 month"\n'
                                    'ExpiresByType image/svg+xml "access plus 1 month"\nExpiresByType text/css "access plus 1 week"\n'
                                    'ExpiresByType application/javascript "access plus 1 week"\n</IfModule>\n'
                                    '<IfModule mod_deflate.c>\nAddOutputFilterByType DEFLATE text/html text/css application/javascript '
                                    'application/json image/svg+xml text/plain\n</IfModule>\n')
    (DIST / 'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
                                      + ''.join(f'<url><loc>{SITE}{s}</loc></url>' for s in LANGS.values()) + '</urlset>\n')
    fuentes = ['# Fuentes de cada cifra', '', 'Generado por build.py desde src/cifras.toml. No editar a mano.', '',
               '| Cifra | Qué es | Tipo | Fuente |', '|---|---|---|---|']
    fuentes += [f"| {c['valor']} | {c['que']} | {c['tipo']} | {c['fuente']} |" for c in cifras]
    (ROOT / 'FUENTES.md').write_text('\n'.join(fuentes) + '\n')
    if warns:
        print(f'aviso: {len(set(warns))} textos sin traducir; se usa el español')
    if errors:
        print('\n'.join('ERROR: ' + e for e in sorted(set(errors))))
        sys.exit(1)
    print(f'ok · dist/ generado ({"producción" if PROD else "prototipo"})')

if __name__ == '__main__':
    main()
