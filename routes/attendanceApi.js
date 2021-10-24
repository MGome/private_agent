var router = new require("express").Router();
var axios = require("axios");


/* ENDPOINT 5.5.1 */
/* Falta agregar los parametros del body, estos son todos opcionales */
router.post('/AttendanceAreaAPI/getPerson', async (ctx) => {
	var myHeaders = new fetch.Headers();
	myHeaders.append("Cookie", ctx.header["cookie"]);
    myHeaders.append('Content-Type' , 'application/x-www-form-urlencoded')
    var formBody = ctx.request.body;
    var formBody = new URLSearchParams(formBody).toString();
    
	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
        body: formBody
	};

	var persons = await fetch(`${process.env.URL_API}/EHCommon/ModularAttendance/AttendanceAreaAPI/getPerson`, requestOptions)
		.then(function(response){
			return response.json()
		})
		.catch(error => console.log('error', error));

	ctx.body = persons;
});


/* ENDPOINT 5.5.7 */
//Retorna lo que se ve en la pestaña de attendance report. Requiere si o si como parametros timestamp de inicio y fin, page y limit.
router.post('/getAttendanceReport', async (ctx) => {
	var myHeaders = new fetch.Headers();
	myHeaders.append("Cookie", ctx.header["cookie"]);
    myHeaders.append('Content-Type' , 'application/x-www-form-urlencoded')
    var formBody = ctx.request.body;
    var formBody = new URLSearchParams(formBody).toString();
    
	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
        body: formBody
	};

	var reports = await fetch(`${process.env.URL_API}/EHCommon/ModularAttendance/AttendanceAPI/getAttendanceList`, requestOptions)
		.then(function(response){
			return response.json()
		})
		.catch(error => console.log('error', error));

	ctx.body = reports;
});

/* ENDPOINT 5.5.8 */
//reuqiere de timestamp de inicio y de fin
router.post('/getAttendanceCount', async (ctx) => {
	var myHeaders = new fetch.Headers();
	myHeaders.append("Cookie", ctx.header["cookie"]);
    myHeaders.append('Content-Type' , 'application/x-www-form-urlencoded')
    var formBody = ctx.request.body;

    var formBody = new URLSearchParams(formBody).toString();
    
	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
        body: formBody
	};

	var rules = await fetch(`${process.env.URL_API}/EHCommon/ModularAttendance/AttendanceAPI/getAttendanceCount`, requestOptions)
		.then(function(response){
			return response.json()
		})
		.catch(error => console.log('error', error));

	ctx.body = rules;
});

/* ENDPOINT 5.5.10 */
//Retorna las reglas de la pestaña Attendance Rules
router.post('/getAttendanceRule', async (ctx) => {
	var myHeaders = new fetch.Headers();
	myHeaders.append("Cookie", ctx.header["cookie"]);
    myHeaders.append('Content-Type' , 'application/x-www-form-urlencoded')
    var formBody = ctx.request.body;

    var formBody = new URLSearchParams(formBody).toString();
    
	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
        body: formBody
	};

	var rules = await fetch(`${process.env.URL_API}/EHCommon/ModularAttendance/AttendanceAPI/getClass`, requestOptions)
		.then(function(response){
			return response.json()
		})
		.catch(error => console.log('error', error));

	rules["result"].forEach(function(rule) {
		rule["edit_endpoint"] = `${process.env.URL_DEPLOY}/attendanceApi/updateAttendanceRule`;
		rule["delete_endpoint"]= `${process.env.URL_DEPLOY}/attendanceApi/deleteAttendanceRule`;
		rule["add_person_deparment_endpoint"]= `${process.env.URL_DEPLOY}/attendanceApi/updateAttendanceRulePersonDeparment`;
		rule["view_person_deparment_endpoint"] = `${process.env.URL_DEPLOY}/attendanceApi/getAttendanceRulePersonDeparment`;
	});

	ctx.body = rules;
});

/* ENDPOINT 5.5.11 */
//Retorna la cantidad de reglas en Attendance Rules
router.post('/getAttendanceRuleCount', async (ctx) => {
	var myHeaders = new fetch.Headers();
	myHeaders.append("Cookie", ctx.header["cookie"]);
    myHeaders.append('Content-Type' , 'application/x-www-form-urlencoded')
    var formBody = ctx.request.body;
    var formBody = new URLSearchParams(formBody).toString();
    
	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
        body: formBody
	};

	var count = await fetch(`${process.env.URL_API}/EHCommon/ModularAttendance/AttendanceAPI/getClassCount`, requestOptions)
		.then(function(response){
			return response.json()
		})
		.catch(error => console.log('error', error));

	ctx.body = count;
});

/* ENDPOINT 5.5.12 */
//Agrega la regla a Attendance Rule
//requiere de timstap de inicio y fin, name y dias de la semana en que se realiza. Los dias se mandan en una lista y pueden ser del 1 al 7.
router.post('/addAttendanceRule', async (ctx) => {
	var myHeaders = new fetch.Headers();
	myHeaders.append("Cookie", ctx.header["cookie"]);
    myHeaders.append('Content-Type' , 'application/x-www-form-urlencoded')
	const param = "weeek[]";
	var formBody = [];
	for (var property in ctx.request.body) {
		if (property=="week") {
			for (let day of ctx.request.body["week"]) {
				var encodedKey = "week[]";
				var encodedValue = encodeURIComponent(day);
				formBody.push(encodedKey + "=" + encodedValue);
			};
		}else{
			var encodedKey = encodeURIComponent(property);
			var encodedValue = encodeURIComponent(ctx.request.body[property]);
			formBody.push(encodedKey + "=" + encodedValue);
		}
	}
	formBody = formBody.join("&");
    
	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
        body: formBody
	};

	var rule = await fetch(`${process.env.URL_API}/EHCommon/ModularAttendance/AttendanceAPI/addClass`, requestOptions)
		.then(function(response){
			return response.json()
		})
		.catch(error => console.log('error', error));

	ctx.body = rule;
});

/* ENDPOINT 5.5.13 */
//Modifica la regla a Attendance Rule
//requiere de id, timstap de inicio y fin, name y dias de la semana en que se realiza. Los dias se mandan en una lista y pueden ser del 1 al 7.
router.post('/updateAttendanceRule', async (ctx) => {
	var myHeaders = new fetch.Headers();
	myHeaders.append("Cookie", ctx.header["cookie"]);
    myHeaders.append('Content-Type' , 'application/x-www-form-urlencoded')
	var formBody = [];
	for (var property in ctx.request.body) {
		if (property=="week") {
			for (let day of ctx.request.body["week"]) {
				var encodedKey = "week[]";
				var encodedValue = encodeURIComponent(day);
				formBody.push(encodedKey + "=" + encodedValue);
			};
		}else{
			var encodedKey = encodeURIComponent(property);
			var encodedValue = encodeURIComponent(ctx.request.body[property]);
			formBody.push(encodedKey + "=" + encodedValue);
		}
	}
	formBody = formBody.join("&");
    
	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
        body: formBody
	};

	var rule = await fetch(`${process.env.URL_API}/EHCommon/ModularAttendance/AttendanceAPI/updateClass`, requestOptions)
		.then(function(response){
			return response.json()
		})
		.catch(error => console.log('error', error));

	ctx.body = rule;
	
});

/* ENDPOINT 5.5.14 */
//Requiere del id
router.post('/deleteAttendanceRule', async (ctx) => {
	var myHeaders = new fetch.Headers();
	myHeaders.append("Cookie", ctx.header["cookie"]);
    myHeaders.append('Content-Type' , 'application/x-www-form-urlencoded')
    var formBody = ctx.request.body;
    formBody["class_id_ay[]"] = formBody["id"];
    delete formBody['id'];
	var formBody = new URLSearchParams(formBody).toString();
	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
        body: formBody
	};

	var count = await fetch(`${process.env.URL_API}/EHCommon/ModularAttendance/AttendanceAPI/deleteClass`, requestOptions)
		.then(function(response){
			return response.json()
		})
		.catch(error => console.log('error', error));

	ctx.body = count;
});

/* ENDPOINT 5.5.15 */
router.post('/getAttendanceRulePersonDeparment', async (ctx) => {
	var myHeaders = new fetch.Headers();
	myHeaders.append("Cookie", ctx.header["cookie"]);
    myHeaders.append('Content-Type' , 'application/x-www-form-urlencoded')
    var formBody = ctx.request.body;
	var formBody = new URLSearchParams(formBody).toString();
	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
        body: formBody
	};

	var count = await fetch(`${process.env.URL_API}/EHCommon/ModularAttendance/AttendanceAPI/getClassPerson`, requestOptions)
		.then(function(response){
			return response.json()
		})
		.catch(error => console.log('error', error));

	ctx.body = count;
});

/* ENDPOINT 5.5.16 */
//Con este tambien se modifica, requiere de una lista con de id de las personas de los departamentos y claas_id. 
router.post('/updateAttendanceRulePersonDeparment', async (ctx) => {
	var myHeaders = new fetch.Headers();
	myHeaders.append("Cookie", ctx.header["cookie"]);
    myHeaders.append('Content-Type' , 'application/x-www-form-urlencoded')
	var formBody = [];

	for (var property in ctx.request.body) {
		if (property=="person_ids") {
			for (let day of ctx.request.body["person_ids"]) {
				var encodedKey = "person_id_ay[]";
				var encodedValue = encodeURIComponent(day);
				formBody.push(encodedKey + "=" + encodedValue);
			};
		}else{
			if (property=="deparment_ids") {
				for (let day of ctx.request.body["deparment_ids"]) {
					var encodedKey = "branch_id_ay[]";
					var encodedValue = encodeURIComponent(day);
					formBody.push(encodedKey + "=" + encodedValue);
				};
			}else{
				var encodedKey = "class_id";
				var encodedValue = encodeURIComponent(ctx.request.body[property]);
				formBody.push(encodedKey + "=" + encodedValue);
			}
		}
	}
	formBody = formBody.join("&");


	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
        body: formBody
	};

	var count = await fetch(`${process.env.URL_API}/EHCommon/ModularAttendance/AttendanceAPI/addClassPerson`, requestOptions)
		.then(function(response){
			return response.json()
		})
		.catch(error => console.log('error', error));

	ctx.body = count;
});





module.exports = router;