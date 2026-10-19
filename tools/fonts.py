"""Fuentes web: genera los woff2 de assets/fonts/ a partir de los OTF/TTF originales.

  pip install fonttools brotli
  python3 tools/fonts.py

Butler: Chromium no pinta algunos acentos de los OTF originales (en el peso 400, «á», «ú» y «Á»: se veía
«M s de 50.000» y «¿Cu nto cuesta?»). Algunos glifos se componen con el operador CFF antiguo «seac» o con
subrutinas que el saneador de fuentes de Chrome rechaza. Se redibujan todos los glifos como contornos
planos (T2CharStringPen) y se guardan en woff2. Se pierde el hinting CFF, que Chromium apenas usa.

Sofia Sans Condensed: solo se pasa a woff2 (de 343 KB a 110 KB).
"""
import pathlib
from fontTools.ttLib import TTFont
from fontTools.pens.t2CharStringPen import T2CharStringPen

FONTS = pathlib.Path(__file__).resolve().parent.parent / 'assets' / 'fonts'

def butler(name):
    f = TTFont(FONTS / f'{name}.otf')
    gs = f.getGlyphSet(); cff = f['CFF '].cff; top = cff[cff.fontNames[0]]; cs = top.CharStrings
    nuevos = {}
    for g in list(cs.keys()):
        pen = T2CharStringPen(gs[g].width, gs); gs[g].draw(pen)
        nuevos[g] = pen.getCharString(private=top.Private, globalSubrs=cff.GlobalSubrs)
    for g, c in nuevos.items():
        cs[g] = c
    f.flavor = 'woff2'; f.save(FONTS / f'{name}.woff2')

def woff2(src, dst):
    f = TTFont(FONTS / src); f.flavor = 'woff2'; f.save(FONTS / dst)

if __name__ == '__main__':
    for w in ('Light', 'Regular', 'Medium'):
        butler(f'Butler-{w}')
    woff2('SofiaSansCondensed-VF.ttf', 'SofiaSansCondensed.woff2')
    for p in sorted(FONTS.glob('*.woff2')):
        print(f'{p.name:32} {p.stat().st_size // 1024} KB')
