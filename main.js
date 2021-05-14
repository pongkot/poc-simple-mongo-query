const { MongoClient } = require("mongodb");
const { from } = require("rxjs");
const { tap } = require("rxjs/operators");

const dbName = "database";
const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri, {
  useUnifiedTopology: true,
});

const createDbo = async (client, dbName) => {
  return (await client.connect()).db(dbName);
};

const app = async () => {
  const dbo = await createDbo(client, dbName);
  const cursor = dbo.collection("collection").find({});

  from(cursor)
    .pipe(tap((e) => console.log(e)))
    .subscribe();
};

app();
