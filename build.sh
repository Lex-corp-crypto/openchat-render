#!/bin/bash
set -o errexit

echo "🔨 Starting build process..."

# Mettre à jour pip
echo "📦 Upgrading pip..."
pip install --upgrade pip

# Installer les dépendances
echo "📚 Installing Python dependencies..."
pip install -r requirements.txt

# Vérifier que Django est installé
echo "✅ Checking Django installation..."
python -c "import django; print(f'Django {django.__version__} installed successfully')"

# Collecter les fichiers statiques
echo "🖼️ Collecting static files..."
python manage.py collectstatic --noinput

# Appliquer les migrations
echo "🗃️ Applying database migrations..."
python manage.py migrate

# Créer un superuser (silencieusement)
echo "👤 Creating superuser if needed..."
python manage.py shell << EOF
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@openchat.com', 'admin123')
    print('Superuser created: admin / admin123')
else:
    print('Superuser already exists')
EOF

echo "🎉 Build completed successfully!"