# ⚠️ ATTENTION - Configuration Application

Le fichier `application.properties` contient des **données sensibles** (mots de passe, clés secrètes).

## 🔒 Pour Configurer Votre Environnement Local

1. **Copiez le fichier exemple** :
   ```bash
   cp application.properties.example application.properties
   ```

2. **Modifiez les valeurs** dans `application.properties` :
   - Remplacez `VOTRE_HOST_SUPABASE` par votre host Supabase
   - Remplacez `VOTRE_USERNAME` par votre username
   - Remplacez `VOTRE_PASSWORD` par votre mot de passe
   - Changez la clé JWT en production

3. **Ne commitez JAMAIS** `application.properties` !

## 📝 Configuration Requise

### Base de Données Supabase
```properties
spring.datasource.url=jdbc:postgresql://VOTRE_HOST:5432/postgres
spring.datasource.username=VOTRE_USERNAME
spring.datasource.password=VOTRE_PASSWORD
```

### JWT Secret (Production)
Générez une clé sécurisée :
```bash
openssl rand -base64 64
```

## ✅ Sécurité

Le fichier `application.properties` est **exclu du dépôt Git** via `.gitignore`.

Seul `application.properties.example` est versionné (sans credentials réels).
