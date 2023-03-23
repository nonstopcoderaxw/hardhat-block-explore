#!/bin/bash



# when a query returns non-zero, the script will be set to stop
set -e 

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE ROLE $POSTGRES_USER1 WITH LOGIN PASSWORD '$(cat $POSTGRES_USER1_PASSWORD_FILE)';
	CREATE DATABASE hh_raw;
	GRANT ALL PRIVILEGES ON DATABASE hh_raw TO $POSTGRES_USER1;
	\c hh_raw;
	GRANT ALL ON SCHEMA public to $POSTGRES_USER1;
	set role $POSTGRES_USER1;
	CREATE TABLE account(
		address char(32) PRIMARY KEY,
		balance integer NOT NULL
	);
EOSQL
