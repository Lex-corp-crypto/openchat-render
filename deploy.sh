#!/bin/bash

echo "🚀 Déploiement d'OpenChat avec système d'émojis..."

# Activation de l'environnement virtuel
source venv/bin/activate

# Arrêt des services existants
echo "🛑 Arrêt des services existants..."
pkill -f daphne
pkill -f redis-server

# Démarrage de Redis
echo "🔴 Démarrage de Redis..."
sudo systemctl start redis-server
sudo systemctl enable redis-server

# Installation des dépendances
echo "📦 Installation des dépendances..."
pip install -r requirements.txt

# Applications des migrations
echo "🔄 Application des migrations..."
python manage.py makemigrations
python manage.py migrate

# Collecte des fichiers statiques
echo "📁 Collecte des fichiers statiques..."
python manage.py collectstatic --noinput

# Création du superuser si inexistant
echo "👤 Vérification du superuser..."
python manage.py shell -c "
from django.contrib.auth import get_user_model;
User = get_user_model();
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@openchat.com', 'admin123');
    print('Superuser créé: admin/admin123');
else:
    print('Superuser existe déjà');
"

# Démarrage de Daphne
echo "🌐 Démarrage du serveur Daphne..."
daphne -b 0.0.0.0 -p 8000 openchat_project.asgi:application &

echo ""
echo "✅ OpenChat est maintenant accessible sur http://localhost:8000"
echo "🎨 Système d'émojis intégré avec succès!"
echo "👥 Connectez-vous avec: admin / admin123"
echo ""
echo "📱 Fonctionnalités activées:"
echo "   • Chat temps réel avec WebSocket"
echo "   • Sélecteur d'émojis avancé"
echo "   • Notifications en temps réel"
echo "   • Interface responsive"
echo "   • Animations fluides"