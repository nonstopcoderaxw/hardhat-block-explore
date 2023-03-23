#!/bin/bash
set -e 

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	\c hh_raw
	DROP TABLE IF EXISTS account;
	\c postgres;
	DROP DATABASE IF EXISTS hh_raw;
	DROP ROLE IF EXISTS $POSTGRES_USER1;
EOSQL