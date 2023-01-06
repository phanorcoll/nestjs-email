print('Start #################################################################');
db = db.getSiblingDB('vertrical');
console.log(db)
db.createCollection('users');
db.users.insertMany([
  {
    "name": "Max",
    "email": "mx@test.com",
    "receivedEmails":[],
  },
  {
    "name": "Phanor",
    "email": "hello@test.com",
    "receivedEmails":[
      {
        "from": "pc@hotmail.com",
        "receivedDate": new Date(),
        "read": false,
        "deleted": false,
        "body": "Nulla facilisi cras fermentum odio eu feugiat. Elit pellentesque habitant morbi tristique. Libero justo laoreet sit amet. Porttitor eget dolor morbi non arcu risus quis.",
      }
    ],
  },
  {
    "name": "John",
    "email": "test@test.com",
    "receivedEmails":[
      {
        "from": "pcomputer@gmail.com",
        "receivedDate": new Date(),
        "read": false,
        "deleted": false,
        "body": "Nulla facilisi cras fermentum odio eu feugiat. Elit pellentesque habitant morbi tristique. Libero justo laoreet sit amet. Porttitor eget dolor morbi non arcu risus quis. At tellus at urna condimentum mattis pellentesque id nibh tortor.",
      },
      {
        "from": "pc@hotmail.com",
        "receivedDate": new Date(),
        "read": false,
        "deleted": false,
        "body": "Nulla facilisi cras fermentum odio eu feugiat. Elit pellentesque habitant morbi tristique. Libero justo laoreet sit amet. Porttitor eget dolor morbi non arcu risus quis.",
      }
    ],
  },

]);
print("End #########");
