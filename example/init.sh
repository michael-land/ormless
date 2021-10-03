
docker pull postgres
docker run --name postgres -e POSTGRES_PASSWORD=secret -d postgres -p 5433
docker exec -it postgres psql -U postgres
curl https://raw.githubusercontent.com/devrimgunduz/pagila/master/pagila-schema.sql | psql -U michael -d ormless
curl https://raw.githubusercontent.com/devrimgunduz/pagila/master/pagila-data.sql | psql -U michael -d ormless
echo "ALTER TABLE customer ADD CONSTRAINT customer_email_uk UNIQUE (email);" | psql -U michael -d ormless

