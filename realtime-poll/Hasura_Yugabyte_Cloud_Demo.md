Hasura YugabyteDB Demo - 


Part 1 - 

1. In the interest of time, I've provisioned a Hasura cloud instance (hasura-yb-demo) and YugabyteDB cloud instance before hand

2. Let's configure the Hasura Cloud instance datasource to make use of YugabyteDB Cloud

3. Go To Hasura Cloud and click on Launch Console

4. Configure the the Database on Hasura console

	a. Construct the database url by getting the credentials from Yugabyte cloud instance

	postgresql://username:password@hostname:5433/database


	postgresql://admin:07kojqwf@35.227.153.67:12901/yugabyte

	b. Configure and save database connection String in Hasura console. database name `yugabyte-cloud-instance`

5. Just create a sample test table from hasura, show its being available in the yugabyte shell


Part 2 - 

6. Now let's run on the popular GraphQL sample application thats gets bundled in Hasura GraphQL engine

7. Clone the hasura repo 

	git clone https://github.com/hasura/graphql-engine.git

	cd graphql-engine/community/sample-apps/realtime-poll/

8. update config.yaml for migration 

	endpoint:
	admin_secret:

	get the above values from Hasura console

9. Run the migrations

	hasura migrate apply --database-name yugabyte-cloud-instance

10. Track Table and Relationships
	a. Add a Array relationship for poll_results (option - poll_results . poll_id  → option . poll_id)


11. Navigate to Apollo.js

   change HASURA_GRAPHQL_ENGINE_HOSTNAME and hasura_secret


   subscription getResult($pollId: uuid!) {
  poll_results (
    order_by: {option_id:desc},
    where: { poll_id: {_eq: $pollId} }
  ) {
    option_id
    option { id text }
    votes
  }
}
  pollId : 98277113-a7a2-428c-9c8b-0fe7a91bf42c