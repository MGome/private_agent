var router = new require("express").Router();
var axios = require("axios");


/* ENDPOINT 5.3.1 */
router.post('/branchSettingAPI/getDepartmentList', async (ctx) => {
	var myHeaders = new fetch.Headers();
	myHeaders.append("Cookie", ctx.header["cookie"]);
	myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
	var formBody = ctx.request.body;
	var formBody = new URLSearchParams(formBody).toString();

	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: formBody
	};
	var departments = await fetch(`${process.env.URL_API}/EHCommon/ModularCompany/BranchSettingAPI/getBranchList`, requestOptions)
	.then(function(response){
		return response.json()
	})
	.catch(error => console.log('error', error));

  ctx.body = departments;
});

/* ENDPOINT 5.3.2 */
router.post('/branchSettingAPI/addDepartment', async (ctx) => {
	var myHeaders = new fetch.Headers();
	myHeaders.append("Cookie", ctx.header["cookie"]);
	myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
	var formBody = ctx.request.body;
	var formBody = new URLSearchParams(formBody).toString();

	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: formBody
	};
	var department = await fetch(`${process.env.URL_API}/EHCommon/ModularCompany/BranchSettingAPI/addBranch`, requestOptions)
	.then(function(response){
		return response.json()
	})
	.catch(error => console.log('error', error));

  ctx.body = department;
});
  
/* ENDPOINT 5.3.3 */
router.post('/branchSettingApi/updateBranchInfo', async (ctx) => {
	var myHeaders = new fetch.Headers();
	myHeaders.append("Cookie", ctx.header["cookie"]);
	myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
	var formBody = ctx.request.body;
	var formBody = new URLSearchParams(formBody).toString();

	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: formBody
	};
	var updated = await fetch(`${process.env.URL_API}/EHCommon/ModularCompany/BranchSettingAPI/updateBranchInfo`, requestOptions)
	.then(function(response){
		return response.json()
	})
	.catch(error => console.log('error', error));

  ctx.body = updated;
});

/* ENDPOINT 5.3.4 (Pendiente) */ 

/* ENDPOINT 5.3.5 */
router.post('/branchSettingApi/deleteBranchInfo', async (ctx) => {
	var myHeaders = new fetch.Headers();
	myHeaders.append("Cookie", ctx.header["cookie"]);
	myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
	var formBody = ctx.request.body;
	var formBody = new URLSearchParams(formBody).toString();

	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: formBody
	};
	var deleted = await fetch(`${process.env.URL_API}/EHCommon/ModularCompany/BranchSettingAPI/deleteBranchInfo`, requestOptions)
	.then(function(response){
		return response.json()
	})
	.catch(error => console.log('error', error));

  ctx.body = deleted;
});

/* ENDPOINT 5.3.6 */
router.post('/personSettingAPI/getPersonList', async (ctx) => {
	var myHeaders = new fetch.Headers();
	myHeaders.append("Cookie", ctx.header["cookie"]);
	myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
	var formBody = ctx.request.body;
	var formBody = new URLSearchParams(formBody).toString();

	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: formBody
	};
	var persons = await fetch(`${process.env.URL_API}/EHCommon/ModularCompany/PersonSettingAPI/getPersonList`, requestOptions)
	.then(function(response){
		return response.json()
	})
	.catch(error => console.log('error', error));
 
  /* 
	persons["result"]["type"].forEach(function(person) {
		person["edit_url"] = `${process.env.URL_DEPLOY}/modularArea/AlarmRuleAPI/updatePersonInfo`;
		person["delete_url"] = `${process.env.URL_DEPLOY}/modularArea/AlarmRuleAPI/deletePersonInfo`;
	});
  */
 
  ctx.body = persons;
});

/* ENDPOINT 5.3.7 */
router.post('/personSettingAPI/addPersonInfo', async (ctx) => {
	var myHeaders = new fetch.Headers();
	myHeaders.append("Cookie", ctx.header["cookie"]);
	myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
	var formBody = ctx.request.body;
	var formBody = new URLSearchParams(formBody).toString();

	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: formBody
	};
	var person_info = await fetch(`${process.env.URL_API}/EHCommon/ModularCompany/PersonSettingAPI/addPersonInfo`, requestOptions)
	.then(function(response){
		return response.json()
	})
	.catch(error => console.log('error', error));
  
  ctx.body = person_info;
});

/* ENDPOINT 5.3.8 */
router.get('/personSettingAPI/updatePersonInfo', async (ctx) => {
	var myHeaders = new fetch.Headers();
	myHeaders.append("Cookie", ctx.header["cookie"]);
	myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
	var formBody = ctx.request.body;
	var formBody = new URLSearchParams(formBody).toString();

	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: formBody
	};
	var updated = await fetch(`${process.env.URL_API}/EHCommon/ModularCompany/PersonSettingAPI/updatePersonInfo`, requestOptions)
	.then(function(response){
		return response.json()
	})
	.catch(error => console.log('error', error));
  
  ctx.body = updated;
});

// Cuando una persona está encargada del plan de inspección o la persona a cargo no ha iniciado la tarea
// de inspección, esta no puede ser borrada.

/* ENDPOINT 5.3.9 */
router.get('/personSettingAPI/deletePersonInfo', async (ctx) => {
	var myHeaders = new fetch.Headers();
	myHeaders.append("Cookie", ctx.header["cookie"]);
	myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
	var formBody = ctx.request.body;
	var formBody = new URLSearchParams(formBody).toString();

	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: formBody
	};
	var deleted = await fetch(`${process.env.URL_API}/EHCommon/ModularCompany/PersonSettingAPI/deletePersonInfo`, requestOptions)
	.then(function(response){
		return response.json()
	})
	.catch(error => console.log('error', error));
  
  ctx.body = deleted;
});

/* ENDPOINT 5.3.10 */
// Requiere params obligatorios: card_id, uuid
router.get('/personSettingAPI/bindCard', async (ctx) => {
	var myHeaders = new fetch.Headers();
	myHeaders.append("Cookie", ctx.header["cookie"]);
	myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
	var formBody = ctx.request.body;
	var formBody = new URLSearchParams(formBody).toString();

	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: formBody
	};
	var bind = await fetch(`${process.env.URL_API}/EHCommon/ModularCompany/PersonSettingAPI/bindCard`, requestOptions)
	.then(function(response){
		return response.json()
	})
	.catch(error => console.log('error', error));
  
  ctx.body = bind;
});

/* ENDPOINT 5.3.11 */
// Se aplica el mismo criterio que con el delete de personal, en este caso para desenrolar.
router.get('/personSettingAPI/unbindCard', async (ctx) => {
	var myHeaders = new fetch.Headers();
	myHeaders.append("Cookie", ctx.header["cookie"]);
	myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
	var formBody = ctx.request.body;
	var formBody = new URLSearchParams(formBody).toString();

	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: formBody
	};
	var unbind = await fetch(`${process.env.URL_API}/EHCommon/ModularCompany/PersonSettingAPI/unbindCard`, requestOptions)
	.then(function(response){
		return response.json()
	})
	.catch(error => console.log('error', error));
  
  ctx.body = unbind;
});

module.exports = router;