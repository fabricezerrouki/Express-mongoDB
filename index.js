const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost:27017/graphql-mongo', { useNewUrlParser: true }, function (err) {
   if (err) throw err;
   console.log('Successfully connected to MongoDB');
});

const { GraphQLServer } = require('graphql-yoga');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const People = require('./database/people');
const Service = require('./database/service');

const typeDefs = `
type Query {
	People: [PeopleObject]!
  PeopleByName(lastName: String!): [PeopleObject]
  PeopleByXid(Xid: String!): [PeopleObject]
  PeopleByID(id:ID!): [PeopleObject]
  Service: [ServiceObject]!
  ServiceByID(id:ID!): [ServiceObject]
}
type PeopleObject {
	  id: ID!
    Xid: String!
    firstName: String!
    lastName: String!
    email: String!
    serviceId: String
    apps: [String]
    service: [ServiceObject]
}
type ServiceObject {
	  id: ID!
    name: String!
    location: String!
}
type Mutation {
	createPerson(Xid: String!, firstName: String!, lastName: String!, email: String!, serviceId: String, apps: [String]): PeopleObject
  updatePerson(id: ID!,Xid: String, firstName: String, lastName: String, email: String, serviceId: String, apps: [String]): PeopleObject
	deletePerson(id: ID!): PeopleObject
}
`
const resolvers = {
  Query,
  Mutation
}
const server = new GraphQLServer({
  typeDefs,
  resolvers
})
server.start({port: 7777}, () => console.log(`The server is up and running on http://localhost:7777`))
