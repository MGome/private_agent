var router = new require("express").Router();
var axios = require("axios");

const url = 'https://jsonplaceholder.typicode.com/todos/1';


/* ENDPOINT 5.1.9 DOC */
router.get('/getAllBaseStationInfo', async (ctx) => {
  var users = await fetch(url).then(function(response){
    return response.json()
  });
  console.log(users);
  const respuesta = {"result":[
      {
    " base _station_y ": 5,
    " base _station_x ": -3.6,
    " base _station_z ": 2,
    " base _station_id ": 4220,
    " network _id ": 1,
    " subnet _id ": 6,
    "online": 1,
    " sn ": null
    }, 
    {
    " base _station_y ": 4.35,
    " base _station_x ": 2.84,
    " base _station_z ": 2,
    " base _station_id ": 4591,
    " network _id ": 1,
    " subnet _id ": 6,
    "online": 1,
    " sn ": null
    }]};

  ctx.body = respuesta;
});

/* ENDPOINT 5.1.10 DOC */
router.get('/getBaseStation', async (ctx) => {
    var users = await fetch(url).then(function(response){
      return response.json()
    });
    console.log(users);
    const respuesta = {"result":[
        {
            " base _station_y ": 12.71,
            " base _station_x ": 50.3,
            " base _station_z ": 2.95,
            " base _station_id ": 9002,
            " network _id ": 1,
            " subnet _id ": 21,
            "online": 1,
            " floor _name ": "444",
            " floor _id ": "3",
            " building _id ": "1",
            " scene _id ": "1"
        },
        {
            " base _station_y ": 0,
            " base _station_x ": 50.3,
            " base _station_z ": 2.93,
            " base _station_id ": 8229,
            " network _id ": 1,
            " subnet _id ": 21,
            "online": 1,
            " floor _name ": "444",
            " floor _id ": "3",
            " building _id ": "1",
            " scene _id ": "1"
        },
        {
            " base _station_y ": 12.71,
            " base _station_x ": 42.36,
            " base _station_z ": 3.06,
            " base _station_id ": 8277,
            " network _id ": 1,
            " subnet _id ": 21,
            "online": 1,
            " floor _name ": "444",
            " floor _id ": "3",
            " building _id ": "1",
            " scene _id ": "1"
        }
    ]
};
  
    ctx.body = respuesta;
});


/* ENDPOINT 5.1.11 DOC */
router.get('/getCount', async (ctx) => {
    var users = await fetch(url).then(function(response){
      return response.json()
    });
    console.log(users);
    const user1 = {"result":"8"};

    ctx.body = user1;
});

module.exports = router;