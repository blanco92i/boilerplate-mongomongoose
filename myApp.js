let  mongoose = require('mongoose');
require('dotenv').config();


let mongodbUri=process.env.MONGODB_URI;



mongoose.connect(mongodbUri,{ useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name:{
    type:String,
    require:true
  },
  age:{
    type:Number
  },
  favoriteFoods:{
    type:[String]
  }
})



let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const newPerson = new Person({
    name:"blanco",
    age:45,
    favoriteFoods:['azote','vehi','salade']
  })

  newPerson.save((err,data)=> {
    if(err)return done(err);
    done(null , data);
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,(err,data)=>{
    if(err) return done(err);
      done(null,data);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName},(err,data)=>{
    if(err) return done(err);
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food},(err,data)=>{
    if(err) return done(err)
      done(null , data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id:personId},(err,data)=>{
    if(err) return done(err);
    done(null , data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId,(err,person)=>{
    if(err) return done(err)

      //add "hamburger" to the favoriteFoods array
      person.favoriteFoods.push(foodToAdd)
      person.save((err,updateUser)=>{
        if(err) return done(err);
        done(null , updateUser);
      })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName},{age:ageToSet},{new:true},(err,updatePerson)=>{
    if(err) return done(err);
    done(null,updatePerson)
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId,(err,deletedPerson)=>{
    if(err) return done(err);
    done(null,deletedPerson);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove},(err,deletedObjects)=>{
    if(err) return done(err)
    done(null ,deletedObjects);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch})
  .sort({name:1})
  .limit(2)
  .select('-age')
  .exec((err,data)=>{
    if(err) return done(err)
    done(null, data)
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
