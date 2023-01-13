print('Start #################################################################');
db = db.getSiblingDB('vertrical');
console.log(db)
db.createCollection('users');
db.users.insertMany([
  {
    "name": "Max",
    "email": "mx@test.com",
    "password": "264f0ccbd959409f.641800b8e2d21bd542cc157c2b44154ab1fa426943bc01353b3a7b3436eff2f4",
    "createdAt": new Date("2023-01-06T22:26:31.214+00:00"),
    "updatedAt": new Date("2023-01-06T22:26:31.214+00:00")
  },
  {
    "name": "Phanor",
    "email": "hello@test.com",
    "password": "264f0ccbd959409f.641800b8e2d21bd542cc157c2b44154ab1fa426943bc01353b3a7b3436eff2f4",
    "createdAt": new Date("2023-01-06T22:26:31.214+00:00"),
    "updatedAt": new Date("2023-01-06T22:26:31.214+00:00")
  },
  {
    "name": "John",
    "email": "test@test.com",
    "password": "264f0ccbd959409f.641800b8e2d21bd542cc157c2b44154ab1fa426943bc01353b3a7b3436eff2f4",
    "createdAt": new Date("2023-01-06T22:26:31.214+00:00"),
    "updatedAt": new Date("2023-01-06T22:26:31.214+00:00")
  },

]);
print("End #########");
