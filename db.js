const { MongoClient, ObjectId } = require("mongodb");

const mongoString = "";

async function connect() {
    const client = new MongoClient(mongoString);

    try {
        await client.connect();
        return client;
    } catch (e) {
        console.error(e);
    }
}

async function list_parts(client) {
    let list = await client.db("parts").collection("parts").find().toArray();
    return list;
}

async function insert(client, data) {
    let r = await client.db("parts").collection("parts").insertOne(data);
    return r;
}

async function delete_part(client, partId) {
    let r = await client.db("parts").collection("parts").deleteOne({ _id: new ObjectId(partId) });
    return r;
}

function close(client) {
    client.close();
}

module.exports = {connect, close, list_parts, insert, delete_part}