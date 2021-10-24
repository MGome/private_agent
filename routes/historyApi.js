var router = new require("express").Router();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(args)); // https://www.npmjs.com/package/node-fetch


/* ENDPOINT 5.2.1 DOC */
router.get('historyApi.index.person', '/getPersonList', async (ctx) => {
  var jsonparams = ctx.request.body;
  console.log(jsonparams);
  const queryparams = new URLSearchParams();
  var persons = await fetch(url, {method: 'POST', body: queryparams}).then(function(response){
    return response.json()
  });
  console.log(persons);
  ctx.body = fake_person;
});

router.get('historyApi.index.trucks', '/getTruckList', async (ctx) => {
  var jsonparams = ctx.request.body;
  console.log(jsonparams);
  const queryparams = new URLSearchParams();
  var persons = await fetch(url, {method: 'POST', body: queryparams}).then(function(response){
    return response.json()
  });
  console.log(persons);
  ctx.body = fake_person;
});

router.get('historyApi.index.trucks', '/getCardFloorDataTime', async (ctx) => {
  var jsonparams = ctx.request.body;
  console.log(jsonparams);
  const queryparams = new URLSearchParams();
  var persons = await fetch(url, {method: 'POST', body: queryparams}).then(function(response){
    return response.json()
  });
  console.log(persons);
  ctx.body = fake_person;
});


router.get('historyApi.index.trucks', '/getCardHistoryByCardId', async (ctx) => {
  var jsonparams = ctx.request.body;
  console.log(jsonparams);
  const queryparams = new URLSearchParams();
  var persons = await fetch(url, {method: 'POST', body: queryparams}).then(function(response){
    return response.json()
  });
  console.log(persons);
  ctx.body = fake_person;
});

router.get('historyApi.index.trucks', '/getCardHistoryByCardUuid', async (ctx) => {
  var jsonparams = ctx.request.body;
  console.log(jsonparams);
  const queryparams = new URLSearchParams();
  var persons = await fetch(url, {method: 'POST', body: queryparams}).then(function(response){
    return response.json()
  });
  console.log(persons);
  ctx.body = fake_person;
});

router.get('historyApi.index.trucks', '/getCardHistoryByArea', async (ctx) => {
  var jsonparams = ctx.request.body;
  console.log(jsonparams);
  const queryparams = new URLSearchParams();
  var persons = await fetch(url, {method: 'POST', body: queryparams}).then(function(response){
    return response.json()
  });
  console.log(persons);
  ctx.body = fake_person;
});

router.get('historyApi.index.trucks', '/getCardHistoryHeatMapByUUID', async (ctx) => {
  var jsonparams = ctx.request.body;
  console.log(jsonparams);
  const queryparams = new URLSearchParams();
  var persons = await fetch(url, {method: 'POST', body: queryparams}).then(function(response){
    return response.json()
  });
  console.log(persons);
  ctx.body = fake_person;
});

router.get('historyApi.index.trucks', '/getCardFloorDataTimeLimit', async (ctx) => {
  var jsonparams = ctx.request.body;
  console.log(jsonparams);
  const queryparams = new URLSearchParams();
  var persons = await fetch(url, {method: 'POST', body: queryparams}).then(function(response){
    return response.json()
  });
  console.log(persons);
  ctx.body = fake_person;
});
module.exports = router;