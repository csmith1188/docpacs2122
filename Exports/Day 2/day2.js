// IMport expressJs module
const express = require('express');
// create a express application obkect
const app = express()
// create one chracter object
var character = {
  name: 'rocky',
  race: "rock",
  profession: "pet",
  equipment: {
    head: {},
    chest: {},
    legs: {},
    arm_p: {},
    arm_s: {}
  },
  inventory: [],
  abilities: [],
  stats: {
    attack: 1,
    defense: 100,
    hp_current: 1,
    hp_max: 1
  },
  // this method searches for an itme in time list with this name
  //and adds it to tgis character's inventory
  pickupItem: function(searchName) {
    for (var item of item_list) {
      console.log(item.name);
      if (searchName = item.name) {
        console.log(" Found a match!");
        this.inventory.push(item)
        break;
      }
    }
  },
  //this method searches for an given slot and replace with empty
  unequipItem: function(slot) {
    for (var slotname in this.equipment) {
      console.log(slotname);
      if (slotname == slot) {
        console.log(" remove");
        this.equipment.slotname = {}
        break;
      }
    }


  }
};

// holds all possible items
var item_list = [{
    name: 'cupcake',
    slot: 'arm_p',
    bonuses: {
      attack: 0
    }
  },
  {
    name: 'sprinkles',
    slot: 'arm_s',
    bonuses: {
      defense: 1
    }
  }
];



// create a Get endpoint
app.get("/", (req, res) => {
  character.unequipItem("arm_p")
  character.pickupItem("cupcake")
  res.send(`<h1> hello there </h1>
    <p>Name: ${character.name}</p>
    <p>race: ${character.race}</p>
    <p>profession: ${character.profession}</p>
    <p>attack: ${character.stats.attack}</p>
    <p>defense: ${character.stats.defense}</p>
    <p>hp: ${character.stats.hp_current}</p>
    <p>max hp: ${character.stats.hp_max}</p>
    <p>inventory ${JSON.stringify(character.inventory)}
    `);
  //each of the character statement
  //one per paragpaph
});
//start an http listen server
app.listen(3000);
