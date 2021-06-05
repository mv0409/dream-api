### Setup postgres database ( a guide to create new database and user with priviligaes for postgres)

1. Open terminal, check postgres status

```service postgresql status```

2. use postgress

```sudo su postgres```

3. enter a postgres shell

```psql```

4. Create new user

```CREATE USER user_1 WITH PASSWORD 'test123';```

5. Set priviligaes

```ALTER USER user_1 WITH SUPERUSER;```

6. Create database 

```CREATE DATABASE k7-tech-db_dev;```

7. Run sequelize migrations

```npm run db:migrate```

If you follow this steps, new database and user will have credentials like `./database/config/config.json` file.
For using our own, ( already created ) user and password , please alter `.database/config/config.json` file to suit your postgres logging needs.
