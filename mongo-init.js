print('Start #################################################################');
db = db.getSiblingDB('vertrical');
console.log(db)
db.createCollection('users');
db.users.insertMany([
  {
    "name": "Max",
    "email": "mx@test.com",
    "receivedEmails":[],
    "createdAt": new Date("2023-01-06T22:26:31.214+00:00"),
    "updatedAt": new Date("2023-01-06T22:26:31.214+00:00")
  },
  {
    "name": "Phanor",
    "email": "hello@test.com",
    "createdAt": new Date("2023-01-06T22:26:31.214+00:00"),
    "updatedAt": new Date("2023-01-06T22:26:31.214+00:00")
  },
  {
    "name": "John",
    "email": "test@test.com",
    "createdAt": new Date("2023-01-06T22:26:31.214+00:00"),
    "updatedAt": new Date("2023-01-06T22:26:31.214+00:00")
  },

]);
print("End #########");
