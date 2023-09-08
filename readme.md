# Bitchest

Bitchest est un projet d'école
qui a pour but de simuler un site d'achat/vente de 
crypto-monnaie. Il est construit avec react en front et laravel en back.

## Pour commencer
***
Vous aurez besoin de :

- Docker
- NodeJS

### Installation

 Front-end

```
cd front
pnpm install
```

Back-end

```
cd api
composer install
```
Copier le contenu du [.env.exemple](./api/.env.example) dans un .env

### Développement

Pour lancer le serveur de développement, 
depuis la racine du projet, lancer la commande : 

```
pnpm run dev
```

Enfin, remplissez votre BDD avec des données factices avec : 

```
docker compose exec api php artisan migrate:fresh --seed
```

### Usage

Le mot de passe de tous les utilisateurs est : test 
 