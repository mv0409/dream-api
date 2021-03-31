### Setup postgres database ( a guide to create new database and user with priviligaes for postgres)

### open terminal, check postgres status

```service postgresql status```

### use postgress

```sudo su postgres```

### enter a postgres shell

```psql```

### Create new user

```CREATE USER user_1 WITH PASSWORD 'test123';```

### set priviligaes

```ALTER USER user_1 WITH SUPERUSER;```

### create database table

```CREATE DATABASE k7-tech-db_dev```

If you follow this steps, new database and user will have credentials like `./database/config/config.json` file.
For using our own, ( already created ) user and password , please alter `.database/config/config.json` file to suit your postgres logging needs.
