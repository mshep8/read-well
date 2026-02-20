# Database Setup for Learn2Read

Create the `learn2read` database and run the scripts in order.

From the project root:

```bash
# 1. Create the database (requires PostgreSQL to be running)
createdb learn2read

# 2. Create all tables
psql learn2read -f db/learn2read_creation.sql

# 3. Add seed data (4 users + categories, lessons, etc.)
psql learn2read -f db/lear2read_data.sql
```

Or from the `db` folder:

```bash
cd db
createdb learn2read
psql learn2read -f learn2read_creation.sql
psql learn2read -f lear2read_data.sql
```
