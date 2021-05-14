const { MongoClient } = require("mongodb");
const { from } = require("rxjs");
const { tap } = require("rxjs/operators");

const dbName = "database";
const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri, {
  useUnifiedTopology: true,
});

const createDb = async (client, dbName) => {
  return (await client.connect()).db(dbName);
};

const app = async () => {
  const mongo = await createDb(client, dbName);
  const cursor = mongo.collection("collection").find({});

  from(cursor)
    .pipe(tap((e) => console.log(e)))
    .subscribe();
};

app();
