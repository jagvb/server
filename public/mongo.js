import {MongoClient} from 'mongodb';

const client = new MongoClient("mongodb://localhost:27017");

await client.connect();

let db = client.db('test');
let coll = db.collection('prod');
let res = await coll.find({cost: 300}).toArray();

let res1 = await coll.find({rest: 10}).toArray();

let res2 = await coll.find({rest: 10, cost: 100}).toArray();
let res3 = await coll.findOne({rest: 30, cost: 300})

let res4 = await coll.count({ cost: 500})

let proj = {name: 1, cost: 1}
let proj1 = {_id: 0}
let res5 = await coll.find().project(proj)
let res6 = await coll.find().project(proj1)

let res7 = await coll.distinct('cost');

let prod = {name: 'test', cost: 300, rest: 30};

let prods = [
	{
		name: 'prod1',
		cost: 1000,
		rest: 100,
	},
	{
		name: 'prod2',
		cost: 2000,
		rest: 200,
	},
	{
		name: 'prod3',
		cost: 3000,
		rest: 300,
	},
];
await coll.insertMany(prods);

await coll.deleteOne({cost: 400})
let del = await coll.deleteOne()

await coll.deleteMany({cost: 500});

let coll1 = db.collection('users');
// await coll1.drop();

await coll.updateOne({cost: 300}, {$set: {cost: 900}});

await coll.updateMany({cost:300}, {$set:{rest: 10}});

let res8 = await coll.findOneAndUpdate({cost: 10}, {$set: {touch: 1}});

let cond = {cost: {$lt: 500}};
let res9  = await coll.find(cond).toArray();
let cond1 = {cost: {$gt: 500}};
let res10  = await coll.find(cond1).toArray();
let cond2 = {age: {$lte: 44}};
let res11  = await coll1.find(cond2).toArray();

//Придумать
let cond3 = {$and: [
    {cost: {$gte: 9}},
    {cost: {$lte: 100}},
]}
let res12 = await coll.find(cond3).toArray();

let cond4 = {$or : [
    {cost: {$gte: 10}},
    {cost: {$lte: 100}},
]}
let res13 = await coll.find(cond4).toArray();

let cond5 = {$not : [
    {cost: {$gte: 10}},
    {cost: {$lte: 100}},
]}
let res14 = await coll.find(cond4).toArray();


let res15 = await coll.find().sort({cost: 1}).toArray();
let res16 = await coll.find().sort({cost: -1}).toArray();

let res17 = await coll.find().limit(3).toArray();
let res18 = await coll.find().skip(3).limit(3).toArray();

let prod1 = db.collection('hero');
let cond6 = {color: {$size: 3}};
let res19 = await prod1.find(cond).toArray();


app.get('/users', async function(req, res) {
	let users = await prod1.find().toArray();
	console.log(users);
});