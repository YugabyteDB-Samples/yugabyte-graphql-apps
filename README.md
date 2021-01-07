# Scalable, available, multi-region apps with Hasura and YugabyteDB

For cloud native API developers, factors like GraphQL Query performance, handling infrastructure outages, and scalability of GraphQL applications are as important as ease of use GraphQL provides. This repo will provide a ![benchmark tool](./graphql-subscription-perf-tool) and details for deploying the benchmark setup on a Kubernetes cluster. ![Benchmark Setup](images/benchmark.png)


# Steps for Deploying the Benchmark Setup for 100K subscription run


## Step 1: Deploy YB cluster on Kubernetes

Following the ![docs](https://docs.yugabyte.com/latest/deploy/kubernetes/) for deploying YugabyteDB Cluster using helm charts on Kubernetes.

YugabyteDB cluster resource deatils: ` 3 pods * 16 vcpu, 32GB RAM, 2 * 100 GB SSD`.

Note the external-IP for yb-tserver-service which we are going to use to establish a connection between YugabyteDB and the serverless application.

```
$ kubectl get services --namespace yb-demo
```
![service](images/k8s_service.png)


## Step 2: Prepare the database with table schema

a. Open the YSQL shell (ysqlsh), specifying the yugabyte user and prompting for the password.

```
$ ./ysqlsh -U yugabyte -W

When prompted for the password, enter the yugabyte password (default is yugabyte). You should be able to login and see a response like below.

ysqlsh (11.2-YB-2.3.3.0-b0)
Type "help" for help.

yugabyte=#
```

b. Create `hasuratest` database

```
yugabyte=# create database hasuratest;
```
c. Create the tables

./bin/ysqlsh -h <yb-tserver-service> -f ./resources/user.sql
./bin/ysqlsh -h <yb-tserver-service> -f ./resources/user_orders.sql
./bin/ysqlsh -h <yb-tserver-service> -f ./resources/events.sql

### Step 3: Deploy Hasura

a. Lets first Deploy 1 Hasura pod, 4vcpu/ 8GB (20k subscriptions)
b. Track tables and relationships from hasura console
c. Update the stateful set to deploy 5 hasura instances

### Step 4: Load Primary table, users table

Load 1M Users

```
kubectl run --image=nchandrappa/yb-sample-apps:1.0.12-SNAPSHOT yb-sample-apps-01 --limits="cpu=3200m,memory=4Gi" --requests="cpu=3000m,memory=4Gi" -- --workload SqlProductUserOrdersUpdate --nodes yb-tserver-0.yb-tservers.yb-dev-hasura-perf-cluster.svc.cluster.local:5433 --num_unique_keys 1000000 --num_threads_read 0 --num_threads_write 10 --batch_size 5 --data_load_prefix 0 --action_type loadprimary --default_postgres_database hasuratest --num_writes 1000000
```

### 





