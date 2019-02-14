const People = require('../database/people');
const Service = require('../database/service');
const queries = {
    People: () => People.find({}),
    PeopleByName: (root,args,context,info) => People.find({lastName: args.lastName}),
    PeopleByID: (root,args,context,info) => People.find({_id: args.id}),
    PeopleByXid: (root,args,context,info) => People.find({Xid: args.Xid}),
    Service: () => Service.find({}),
    ServiceByID: (root,args,context,info) => Service.find({_id: args.id})
  };

module.exports = queries;
