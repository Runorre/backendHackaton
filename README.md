# Serveur Backend

## Start

Pour lancer le Backend faite

```bash
    npm run test
```
le serveur Backend sera sur le port 3000

## Installation

### MongoDB

Installer MongoDB pour la base de donnée

https://www.mongodb.com/docs/manual/installation/

### Crée les variable d'environnement
Crée un fichier qui sera .env et il doit contenir ceci
```env
JWT_SECRET="ALED"
```

### Packages

```bash
  npm i
```

## Information
Par defaut, un compte admin est crée, voici ces logins :

```
    email : admin@room.fr
    MDP : Admin2024
```

## API Reference

## Auth

### Register
```
POST /api/auth/register
```

| Paramètre	| Type	| Description |
| :-------- | :---- | :---------- |
| `email`	| `string`	| **Obligatoire.** L'adresse e-mail de l'utilisateur | 
|`password` |	`string` |	**Obligatoire.** Le mot de passe de l'utilisateur|
|`firstname` | `string`	| **Obligatoire.** Le prénom de l'utilisateur|
|`lastname`	| `string`	| **Obligatoire.** Le nom de famille de l'utilisateur|

### Login 
```
Post /api/auth/login
```
| Paramètre | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Obligatoire**. L'adresse e-mail de l'utilisateur |
| `password` | `string` | **Obligatoire**. Le mot de passe de l'utilisateur |

### Change Password
```
Post api/auth/changePassword
```

| Paramètre | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `oldPassword` | `string` | **Obligatoire**. L'ancien mot de passe de l'utilisateur |
| `newPassword` | `string` | **Obligatoire**. Le nouveau mot de passe de l'utilisateur |

## User 

### Modify User 
**Admin**
```
PUT api/user/(id_user)
```

| Paramètre | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Obligatoire**. L'ID de l'utilisateur à modifier |
| `name` | `string` | **Obligatoire**. Le nouveau nom de l'utilisateur |
| `email` | `string` | **Obligatoire**. La nouvelle adresse e-mail de l'utilisateur |

### Modify User Himself
```
PUT api/user/
```

| Paramètre | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Obligatoire**. Le nouveau nom de l'utilisateur |
| `email` | `string` | **Obligatoire**. La nouvelle adresse e-mail de l'utilisateur |

### Delete User 
**Admin**
```
DELETE api/user/(id_user)
```

| Paramètre | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Obligatoire**. L'ID de l'utilisateur à supprimer |

### Get All Users 
**Admin**
```
GET api/user/all
```

Aucun paramètre requis.

### Get User
```
GET api/user/
```

Aucun paramètre requis.

## Room

### Get All Rooms
```
GET api/room/
```

Aucun paramètre requis.

### Create Room 
**Admin**
```
POST api/room/create
```

| Paramètre | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Obligatoire**. Le nom de la salle |
| `capacity` | `number` | **Obligatoire**. La capacité de la salle |

### Modify Room 
**Admin**
```
PUT api/room/(id_room)
```

| Paramètre | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Obligatoire**. L'ID de la salle à modifier |
| `name` | `string` | **Obligatoire**. Le nouveau nom de la salle |
| `capacity` | `number` | **Obligatoire**. La nouvelle capacité de la salle |
| `usable` | `boolean` | **Obligatoire**. L'état d'utilisation de la salle |

### Delete Room 
**Admin**
```
DELETE api/room/(id_room)
```

| Paramètre | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Obligatoire**. L'ID de la salle à supprimer |

## API Event

### Réserver une salle
**Utilisateur**
```
POST api/event/create
```

| Paramètre | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Obligatoire**. Le nom de l'événement |
| `roomId` | `string` | **Obligatoire**. L'ID de la salle à réserver |
| `description` | `string` | **Obligatoire**. La description de l'événement |
| `dateStart` | `date` | **Obligatoire**. La date de début de l'événement |
| `dateEnd` | `date` | **Obligatoire**. La date de fin de l'événement |

### Réserver une salle de manière périodique
**Utilisateur**
```
POST api/event/create-periodical
```

| Paramètre | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Obligatoire**. Le nom de l'événement |
| `roomId` | `string` | **Obligatoire**. L'ID de la salle à réserver |
| `description` | `string` | **Obligatoire**. La description de l'événement |
| `dateStart` | `date` | **Obligatoire**. La date de début de l'événement |
| `dateEnd` | `date` | **Obligatoire**. La date de fin de l'événement |
| `period` | `number` | **Obligatoire**. La période entre chaque réservation |
| `nbrTime` | `number` | **Obligatoire**. Le nombre de fois que la réservation doit être répétée |

### Supprimer un événement (Admin)
**Admin**
```
DELETE api/event/admin/(id_event)
```

| Paramètre | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Obligatoire**. L'ID de l'événement à supprimer |

### Supprimer un événement (Utilisateur)
**Utilisateur**
```
DELETE api/event/(id_event)
```

| Paramètre | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Obligatoire**. L'ID de l'événement à supprimer |

### Confirmer un événement (Admin)
**Admin**
```
POST api/event/admin/confirm
```

| Paramètre | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Obligatoire**. L'ID de l'événement à confirmer |

### Obtenir les événements confirmés
**Utilisateur**
```
GET api/event/
```

### Modifier un événement (Admin)
**Admin**
```
PUT api/event/admin/(id_event)
```

| Paramètre | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Obligatoire**. L'ID de l'événement à modifier |
| `name` | `string` | **Obligatoire**. Le nouveau nom de l'événement |
| `description` | `string` | **Obligatoire**. La nouvelle description de l'événement |
| `dateStart` | `date` | **Obligatoire**. La nouvelle date de début de l'événement |
| `dateEnd` | `date` | **Obligatoire**. La nouvelle date de fin de l'événement |

### Modifier un événement (Utilisateur)
**Utilisateur**
```
PUT api/event/(id_event)
```

| Paramètre | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Obligatoire**. L'ID de l'événement à modifier |
| `name` | `string` | **Obligatoire**. Le nouveau nom de l'événement |
| `description` | `string` | **Obligatoire**. La nouvelle description de l'événement |
| `dateStart` | `date` | **Obligatoire**. La nouvelle date de début de l'événement |
| `dateEnd` | `date` | **Obligatoire**. La nouvelle date de fin de l'événement |

### S'inscrire à un événement
**Utilisateur**
```
POST api/event/register/
```

| Paramètre | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Obligatoire**. L'ID de l'événement pour lequel s'inscrire |

### Inviter à un événement
**Utilisateur**
```
POST api/event/invite/
```

| Paramètre | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Obligatoire**. L'ID de l'événement pour lequel inviter |
| `userId` | `string` | **Obligatoire**. L'ID de l'utilisateur à inviter |

### Inviter à un événement (Admin)
**Admin**
```
POST api/event/admin/invite/
```

| Paramètre | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Obligatoire**. L'ID de l'événement pour lequel inviter |
| `userId` | `string` | **Obligatoire**. L'ID de l'utilisateur à inviter |
