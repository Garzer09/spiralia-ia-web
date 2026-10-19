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
import html, json, re, shutil, sys, tomllib, urllib.parse
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC, DIST = ROOT / 'src', ROOT / 'dist'
PROD = '--prod' in sys.argv
SITE = 'https://spiralia.es/ia/'                  # URL final recomendada (carpeta en Nominalia)
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
           'serviceType': plain(t['ft.tag']), 'provider': {'@id': SITE + '#org'}, 'areaServed': 'ES', 'url': url}
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
<title>Reserva · Spiralia AI</title>
<script>
// Cambia aquí la URL de Bookings sin volver a generar la web.
var BOOKINGS = "{bookings}";
var FALLBACK = "mailto:{mail}?subject=" + encodeURIComponent("Quiero hablar de IA con Spiralia");
location.replace(BOOKINGS.indexOf("http") === 0 ? BOOKINGS : FALLBACK);
</script></head>
<body style="font-family:sans-serif;padding:2rem">Si no se abre solo, escribe a <a href="mailto:{mail}">{mail}</a>.</body></html>
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
                                    'ExpiresByType video/webm "access plus 1 month"\n</IfModule>\n')
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
