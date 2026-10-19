#!/usr/bin/env python3
"""Genera dist/ (ES en / y EN en /en/) a partir de src/.

  python3 build.py           prototipo: noindex y avisos si falta el inglés
  python3 build.py --prod    producción: indexable y sin marcadores pendientes

Comprobaciones: claves sin traducir, {{...}} sin resolver, [PLACEHOLDER] y [BOOKINGS_URL]
en producción, y que cada cifra del copy esté en src/cifras.toml (con la misma cifra en ES y EN).
Las cifras escritas en letras («seis», «una década», «tres de cada cuatro») dan un aviso si no están dadas de alta.

Caché: las URL de css/, js/ y assets/video/ llevan ?v=<huella del fichero>; el HTML se sirve con no-cache.

Bloques condicionales en la plantilla: <!--si:nombre ...--> ... <!--/si--> se quita entero si dentro
queda un [PLACEHOLDER] (así los testimonios solo se publican cuando son reales).
En el copy, {mail} se sustituye por MAIL.
"""
import hashlib, html, json, os, re, shutil, sys, tomllib, urllib.parse
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
errors, warns, avisos = [], [], []

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
            return {'t': v, 'app': localize(x['app'], lang, key + '.app')} if 'app' in x else v
        return {k: localize(v, lang, f'{key}.{k}') for k, v in x.items()}
    if isinstance(x, list):
        return [localize(v, lang, f'{key}[{i}]') for i, v in enumerate(x)]
    return x

def texts(lang):
    t = {f'{s}.{k}': pick(v, lang, f'{s}.{k}') for s, sec in content.items() for k, v in sec.items()}
    return {k: v.replace('{mail}', MAIL) if isinstance(v, str) else v for k, v in t.items()}

plain = lambda v: html.unescape(re.sub(r'<[^>]+>', '', str(v)))

def jsonld(t, url, lang):
    """Datos estructurados: la organización, el servicio y las preguntas del comité (Google y buscadores con IA)."""
    org = {'@type': 'Organization', '@id': SITE + '#org', 'name': 'Spiralia', 'url': 'https://spiralia.es/',
           'description': plain(t['meta.org']),
           'logo': SITE + 'assets/img/spiralia.svg', 'sameAs': ['https://www.linkedin.com/company/spiralia/']}
    srv = {'@type': 'Service', 'name': plain(t['meta.title']), 'description': plain(t['meta.description']),
           'serviceType': plain(t['ft.tag']).rstrip('.'), 'provider': {'@id': SITE + '#org'}, 'url': url,
           'areaServed': {'@type': 'Country', 'name': 'España' if lang == 'es' else 'Spain'},
           'audience': {'@type': 'BusinessAudience', 'audienceType': plain(t['meta.audience'])},
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

# Cifras en letras: el build no las ve como cifras, el lector sí (auditoría §6.6). Solo avisan.
# Con None avisan siempre: «la mitad», «el doble», «miles de» no son una cifra concreta que se pueda dar de alta.
# «un», «una», «one» solo cuentan en proporciones («uno de cada diez»): sueltos son artículos. «once» en inglés es «una vez»
LETRAS = {'es': dict(dos=2, tres=3, cuatro=4, cinco=5, seis=6, siete=7, ocho=8, nueve=9, diez=10, once=11, doce=12, trece=13,
                     catorce=14, quince=15, veinte=20, treinta=30, cuarenta=40, cincuenta=50, sesenta=60, setenta=70, ochenta=80,
                     noventa=90, cien=100, mil=1000, docena=12, década=10, décadas=10,
                     mitad=None, doble=None, triple=None, decenas=None, cientos=None, centenares=None, miles=None, millón=None, millones=None),
          'en': dict(two=2, three=3, four=4, five=5, six=6, seven=7, eight=8, nine=9, ten=10, eleven=11, twelve=12, thirteen=13,
                     fourteen=14, fifteen=15, twenty=20, thirty=30, forty=40, fifty=50, sixty=60, seventy=70, eighty=80, ninety=90,
                     hundred=100, thousand=1000, dozen=12, decade=10, decades=10,
                     half=None, double=None, triple=None, dozens=None, hundreds=None, thousands=None, million=None, millions=None)}
PROPORCION = {'es': {'un', 'uno', 'una'}, 'en': {'one'}}

def numbers(t, lang):
    found = []
    for key, val in t.items():
        if key.split('.')[1].startswith('src') or key.endswith('_src'):
            continue
        plain = re.sub(r'<[^>]+>', ' ', str(val))
        for n in NUM.findall(plain):
            found.append(norm(n))
            if norm(n) not in ALLOWED:
                errors.append(f'cifra sin fuente en cifras.toml: «{n}» en {key}')
        if '[PLACEHOLDER' in plain:
            continue
        for w in re.findall(r'\w+', plain.lower()):
            if w in LETRAS[lang] and (LETRAS[lang][w] is None or str(LETRAS[lang][w]) not in ALLOWED):
                avisos.append(f'cifra en letras sin alta en cifras.toml: «{w}» en {key} ({lang})')
        for a, b in re.findall(r'\b(\w+) (?:de cada|in|out of) (\w+)\b', plain.lower()):
            if (a in LETRAS[lang] or a in PROPORCION[lang]) and b in LETRAS[lang]:
                avisos.append(f'proporción en letras: «{a} … {b}» en {key} ({lang}); mejor la cifra, con su fuente')
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
        'jsonld': jsonld(t, url, lang),
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

RESERVA = """<!doctype html><html lang="es"><head><meta charset="utf-8">
<meta name="robots" content="noindex"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{titulo} · Spiralia AI</title><link rel="icon" href="../assets/img/favicon.svg" type="image/svg+xml">
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
.legal{{margin-top:28px;font-size:.82rem;line-height:1.55}}.legal a{{color:#E0DFDA}}
a.volver{{display:inline-block;margin-top:28px;color:#A9B1B8;font:500 .95rem Sofia,sans-serif;letter-spacing:.06em}}
:focus-visible{{outline:2px solid #E0DFDA;outline-offset:3px}}
</style></head>
<body><main>
<img src="../assets/img/spiralia-blanco.svg" alt="Spiralia" width="120" height="29">
<h1 data-t="h">{h}</h1><p data-t="p">{p}</p><ul data-t="l">{lista}</ul>
<a class="btn" data-t="b" href="mailto:{mail}?subject={asunto}">{btn}</a>
<p><a class="mail" href="mailto:{mail}">{mail}</a> <button type="button" data-t="c" hidden>{copiar}</button></p>
<p class="legal" data-t="g">{legal}</p>
<a class="volver" data-t="v" href="../">{volver}</a>
</main>
<script>
// El HTML lleva el texto en español; con ?l=en se cambia aquí. Desde un «Pregunta por Rumbo», el texto de Rumbo.
var q = new URLSearchParams(location.search), en = q.get("l") === "en", d = q.get("d") || "web";
var T = {textos}[en ? "en" : "es"], rumbo = /^(rumbo|metodo|resultados)$/.test(d);
var $ = function (k) {{ return document.querySelector("[data-t=" + k + "]"); }};
if (en) {{
  document.documentElement.lang = "en"; document.title = T.titulo + " · Spiralia AI";
  $("h").textContent = T.h; $("b").textContent = T.btn; $("v").textContent = T.volver; $("v").href = "../en/";
  $("l").innerHTML = T.lista.map(function (x) {{ return "<li>" + x + "</li>"; }}).join("");
  $("g").innerHTML = T.legal;
}}
$("p").textContent = rumbo ? T.rumbo : T.p;
$("b").href = "mailto:{mail}?subject=" + encodeURIComponent((rumbo ? T.subject_rumbo : T.subject) + " · " + d);
var c = $("c"), txt = T.copiar, reloj;
c.textContent = txt; c.hidden = !navigator.clipboard;
c.onclick = function () {{ navigator.clipboard.writeText("{mail}").then(function () {{
  c.textContent = T.copiado; clearTimeout(reloj); reloj = setTimeout(function () {{ c.textContent = txt; }}, 1800); }}); }};
</script></body></html>
"""

def reserva():
    """/reserva/: la página de contacto mientras no haya Bookings. Texto en español en el HTML (funciona sin JS)."""
    T = {}
    for lang in LANGS:
        t = texts(lang)
        T[lang] = {k[8:]: v for k, v in t.items() if k.startswith('reserva.')}
        T[lang].update(legal=t['cta.legal'], copiar=t['cta.copy'], copiado=t['cta.copied'])
    es = T['es']
    return RESERVA.format(bookings=BOOKINGS, mail=MAIL, titulo=es['titulo'], h=es['h'], p=es['p'], btn=es['btn'],
                          lista=''.join(f'<li>{x}</li>' for x in es['lista']), legal=es['legal'], volver=es['volver'],
                          copiar=es['copiar'], asunto=urllib.parse.quote(es['subject'] + ' · web'),
                          textos=json.dumps(T, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/'))

def fuera(d, nombres):
    """Lo que no se publica: fuentes originales (se sirven en woff2, tools/fonts.py), fotos de personas que la página
    no usa y los PNG de los iconos 3D (se sirven en webp)."""
    tapa = shutil.ignore_patterns('.DS_Store', 'src-*', '*.otf', '*.ttf', 'ana-iza.*', 'jose-garza.*')(d, nombres)
    if Path(d).name == '3d':
        tapa |= {n for n in nombres if n.endswith('.png')}
    return tapa

HUELLAS = {}
def huella(*fs):
    """Ocho caracteres del sha1 del contenido: cambia solo cuando cambia el fichero."""
    h = hashlib.sha1()
    for f in fs:
        if f not in HUELLAS:
            HUELLAS[f] = hashlib.sha1(f.read_bytes()).hexdigest()
        h.update(HUELLAS[f].encode())
    return h.hexdigest()[:8]

REF = r'(?<=["\'\s,(])((?:\.\./)?{}/[\w./-]+\.\w+)(?=["\'\s,)])'
VERSIONADO = re.compile(REF.format('(?:css|js|assets/video)'))
ASSETS = re.compile(REF.format('assets'))
PREFIJOS = re.compile(r'(data-src-h="([^"?]+)" data-src-v="([^"?]+)")')

def versiona(out, page, lang):
    """?v=<huella> en css/, js/ y assets/video/; para los vídeos que el JS completa con la extensión, data-v."""
    d = page.parent
    for ref in set(ASSETS.findall(out)):
        if not (d / ref).is_file():
            errors.append(f'{lang}: falta en dist {ref}')
    out = VERSIONADO.sub(lambda m: m.group(1) + '?v=' + huella((d / m.group(1)).resolve())
                         if (d / m.group(1)).is_file() else m.group(1), out)
    def prefijo(m):
        fs = sorted(f.resolve() for p in m.groups()[1:] for f in (d / p).parent.glob(Path(p).name + '.*'))
        return m.group(1) + (f' data-v="{huella(*fs)}"' if fs else '')
    return PREFIJOS.sub(prefijo, out)

def main():
    tpl = (SRC / 'index.template.html').read_text()
    if DIST.exists():
        shutil.rmtree(DIST)
    nums, pages = {}, {}
    for lang, sub in LANGS.items():
        t = texts(lang)
        nums[lang] = numbers(t, lang)
        pages[DIST / sub / 'index.html'] = (render(tpl, t, lang), lang)
    if not warns and nums['es'] != nums['en']:
        errors.append('las cifras de ES y EN no coinciden')
    shutil.copytree(ROOT / 'assets', DIST / 'assets', ignore=fuera)
    for d in ('css', 'js'):
        shutil.copytree(SRC / d, DIST / d)
    for out, (html_, lang) in pages.items():
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(versiona(html_, out, lang))
    if PROD and not BOOKINGS.startswith('http'):
        errors.append('falta la URL de Microsoft Bookings (BOOKINGS en build.py)')
    (DIST / 'reserva').mkdir()
    (DIST / 'reserva/index.html').write_text(versiona(reserva(), DIST / 'reserva/index.html', 'reserva'))
    robots = 'index, follow' if PROD else 'noindex, nofollow'
    (DIST / 'vercel.json').write_text(json.dumps({'headers': [
        {'source': '/(.*)', 'headers': [{'key': 'X-Robots-Tag', 'value': robots}, {'key': 'X-Content-Type-Options', 'value': 'nosniff'}]},
        {'source': '/((?!assets/|css/|js/).*)', 'headers': [{'key': 'Cache-Control', 'value': 'no-cache'}]}]}, indent=2))
    (DIST / '.htaccess').write_text(f'Header set X-Robots-Tag "{robots}"\nAddType font/otf .otf\nAddType font/ttf .ttf\n'
                                    'AddType video/mp4 .mp4\nAddType video/webm .webm\nAddType font/woff2 .woff2\n'
                                    '# El HTML se revalida siempre; CSS, JS y vídeos cambian de URL (?v=) cuando cambian\n'
                                    '<FilesMatch "\\.html$">\nHeader set Cache-Control "no-cache"\n</FilesMatch>\n'
                                    '<IfModule mod_expires.c>\nExpiresActive On\n'
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
    for a in sorted(set(avisos)):
        print('aviso: ' + a)
    if errors:
        print('\n'.join('ERROR: ' + e for e in sorted(set(errors))))
        sys.exit(1)
    print(f'ok · dist/ generado ({"producción" if PROD else "prototipo"})')

if __name__ == '__main__':
    main()
