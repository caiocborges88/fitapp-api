"""Snapshot de fontes/publicação com lista permitida; exclui credenciais e dependências."""
import hashlib
import json
import os
import re
from pathlib import Path
import zipfile

root = Path(__file__).resolve().parent.parent
prefix = os.environ.get('FITAPP_RELEASE_PREFIX', 'abc')
if not re.fullmatch(r'[a-z][a-z0-9-]*', prefix):
    raise ValueError('Prefixo de release inválido.')
version = json.loads((root / 'public/version.json').read_text(encoding='utf-8'))['version']
allowed = {'.js', '.cjs', '.mjs', '.py', '.json', '.html', '.css', '.svg', '.png', '.ttf', '.txt', '.md', '.rules', '.yaml'}
excluded = {'node_modules', '.git', '.tools', '.firebase', '__pycache__'}
files = []
for directory in ['public', 'functions', 'tests', 'scripts', 'docs']:
    for file in (root / directory).rglob('*'):
        relative = file.relative_to(root)
        if file.is_file() and not any(p in excluded or p.startswith('.') for p in relative.parts) and file.suffix in allowed:
            files.append(file)
for name in ['AGENTS.md', 'README.md', 'package.json', 'package-lock.json', 'firebase.json', 'firestore.rules', 'firestore.indexes.json', '.firebaserc', f'audit/{prefix}-release-before.json']:
    file = root / name
    if file.is_file():
        files.append(file)
archive = root / 'audit' / f'release-{prefix}-{version}.zip'
if archive.exists():
    raise FileExistsError('Snapshot já existe; preserve o pacote anterior.')
manifest = []
with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED) as output:
    for file in sorted(set(files)):
        name = file.relative_to(root).as_posix()
        data = file.read_bytes()
        output.writestr(name, data)
        manifest.append({'path': name, 'sha256': hashlib.sha256(data).hexdigest()})
before = json.loads((root / f'audit/{prefix}-release-before.json').read_text(encoding='utf-8'))
previous = next((root / 'audit').glob(f"release-*-{before['appVersion']}.zip"), None)
report = {'version': version, 'archive': archive.relative_to(root).as_posix(), 'archiveSha256': hashlib.sha256(archive.read_bytes()).hexdigest(),
          'previousHostingVersion': before['hostingVersion'], 'previousRuleset': before['ruleset'], 'files': manifest,
          'secretsIncluded': False, 'productionUserDataIncluded': False}
if previous and previous.is_file():
    report['previousSourceArchive'] = previous.relative_to(root).as_posix()
    report['previousSourceArchiveSha256'] = hashlib.sha256(previous.read_bytes()).hexdigest()
(root / f'audit/{prefix}-source-manifest.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps({'version': version, 'archive': report['archive'], 'files': len(manifest), 'previousHostingVersion': report['previousHostingVersion'], 'previousArchiveAvailable': bool(previous and previous.is_file())}))
