#!/bin/bash
set -o errexit

# Installer les dépendances
pip install -r requirements.txt

# Collecter les fichiers statiques
python manage.py collectstatic --noinput

# Appliquer les migrations
python manage.py migrate

# Créer un superuser si nécessaire (optionnel)
echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('admin', 'admin@openchat.com', 'admin123') if not User.objects.filter(username='admin').exists() else None" | python manage.py shell