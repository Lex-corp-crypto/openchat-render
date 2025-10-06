#!/bin/bash
set -o errexit

echo "🔨 Starting build process..."
pip install --upgrade pip
echo "📚 Installing dependencies..."
pip install -r requirements.txt
echo "🖼️ Collecting static files..."
python manage.py collectstatic --noinput
echo "🗃️ Applying migrations..."
python manage.py migrate
echo "🎉 Build completed!"