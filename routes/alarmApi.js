var router = new require("express").Router();
var axios = require("axios");

/* ENDPOINT 5.9.1 DOC */ 
//Se obtiene la cantidad de alarmas de cada tipo, "help", "alarm" y "low_power" del ultimo mes
//No es muy util
router.post('/getAllCount', async (ctx) => {
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

	var alarms = await fetch(`${process.env.URL_API}/EHCommon/ModularAlarm/AlarmAPI/getAllCount`, requestOptions)
		.then(function(response){
			return response.json()
		})
		.catch(error => console.log('error', error));

	ctx.body = alarms;
});



/* ENDPOINT 5.9.2 DOC */ 
//Se obtienen todas las alarmas, se puede filtrar muchas cosas
router.post('/getAlarms', async (ctx) => {
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

	var alarms = await fetch(`${process.env.URL_API}/EHCommon/ModularAlarm/AlarmAPI/getAlarm`, requestOptions)
		.then(function(response){
			return response.json()
		})
		.catch(error => console.log('error', error));

	alarms["result"].forEach(function(alarm) {
		alarm["edit_endpoint"] = `${process.env.URL_DEPLOY}/alarms/commentUpdate`;
		alarm["delete_endpoint"]= `${process.env.URL_DEPLOY}/alarms/delete`;
		alarm["status_endpoint"]= `${process.env.URL_DEPLOY}/alarms/statusUpdate`;
	});

	ctx.body = alarms;
});


/* ENDPOINT 5.9.3 DOC */
//Retorna la cantidad de alarmas que hay
router.post('/getCount', async (ctx) => {
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

	var alarms = await fetch(`${process.env.URL_API}/EHCommon/ModularAlarm/AlarmAPI/getCount`, requestOptions)
		.then(function(response){
			return response.json()
		})
		.catch(error => console.log('error', error));

	ctx.body = alarms;
});



/* ENDPOINT 5.9.4 DOC */
//Elimina la alarma con el id entregado en el body
router.post('/delete', async (ctx) => {
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

	var alarms = await fetch(`${process.env.URL_API}/EHCommon/ModularAlarm/AlarmAPI/deleteAlarm`, requestOptions)
		.then(function(response){
			return response.json()
		})
		.catch(error => console.log('error', error));

	ctx.body = alarms;
});


/* ENDPOINT 5.9.5 DOC */
//Modifica el comentario de la alarma con el id seleccionado.
router.post('/commentUpdate', async (ctx) => {
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

	var alarms = await fetch(`${process.env.URL_API}/EHCommon/ModularAlarm/AlarmAPI/updateAlarm`, requestOptions)
		.then(function(response){
			return response.json()
		})
		.catch(error => console.log('error', error));

	ctx.body = alarms;
});


/* ENDPOINT 5.9.6 DOC */
//Modifica el status de la alarma con el id seleccionado. 1= procesada, 0 = no procesada
//Ojo que al procesarla cambia el "Handler" tambien, entonces hay que actualizar eso
router.post('/statusUpdate', async (ctx) => {
    var myHeaders = new fetch.Headers();
	myHeaders.append("Cookie", ctx.header["cookie"]);
    myHeaders.append('Content-Type' , 'application/x-www-form-urlencoded')
    var formBody = ctx.request.body;
    formBody["alarm_ids[0]"] = formBody["id"];
    delete formBody['id'];
    var formBody = new URLSearchParams(formBody).toString();
    
	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
        body: formBody
	};

	var alarms = await fetch(`${process.env.URL_API}/EHCommon/ModularAlarm/AlarmAPI/batchProcessing`, requestOptions)
		.then(function(response){
			return response.json()
		})
		.catch(error => console.log('error', error));

	ctx.body = alarms;
});

//Modificado para SOS
/* ENDPOINT 5.9.8 DOC */
//Retorna todas las alarmas de SOS
//Se harcodea el tipo 6, que es Ask For Help
router.post('/getSOS', async (ctx) => {
    var myHeaders = new fetch.Headers();
	myHeaders.append("Cookie", ctx.header["cookie"]);
    myHeaders.append('Content-Type' , 'application/x-www-form-urlencoded')
    var formBody = ctx.request.body;
    formBody["type"] = [6];
    var formBody = new URLSearchParams(formBody).toString();
    
	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
        body: formBody
	};

	var alarms = await fetch(`${process.env.URL_API}/EHCommon/ModularAlarm/AlarmAPI/getHelp`, requestOptions)
		.then(function(response){
			return response.json()
		})
		.catch(error => console.log('error', error));

    alarms["result"].forEach(function(alarm) {
        alarm["type"] = "Ask for Help";
    });

	alarms["result"].forEach(function(alarm) {
		alarm["edit_endpoint"] = `${process.env.URL_DEPLOY}/alarms/updateCommentPagingSOS`;
		alarm["delete_endpoint"]= `${process.env.URL_DEPLOY}/alarms/deletePagingSOS`;
		alarm["status_endpoint"]= `${process.env.URL_DEPLOY}/alarms/updateStatusSOS`;
	});

	ctx.body = alarms;
});


//Modificado para Paging Record
/* ENDPOINT 5.9.8 DOC */
//Retorna todas las alarmas de Paging Record
//Se harcodea el tipo 5 y 6 , 5=Llamada, 6=Evacuación
router.post('/getPagingRecord', async (ctx) => {
    var myHeaders = new fetch.Headers();
	myHeaders.append("Cookie", ctx.header["cookie"]);
    myHeaders.append('Content-Type' , 'application/x-www-form-urlencoded')
    var formBody = ctx.request.body;
    formBody["type"] = [5,7];
    var formBody = new URLSearchParams(formBody).toString();
    
	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
        body: formBody
	};

	var alarms = await fetch(`${process.env.URL_API}/EHCommon/ModularAlarm/AlarmAPI/getHelp`, requestOptions)
		.then(function(response){
			return response.json()
		})
		.catch(error => console.log('error', error));

    alarms["result"].forEach(function(alarm) {
        if (alarm["type"]==5) {
            alarm["type"] = "LLamada";
        }
        else{alarm["type"] = "Evacuación";}
    });

	alarms["result"].forEach(function(alarm) {
		alarm["edit_endpoint"] = `${process.env.URL_DEPLOY}/alarms/updateCommentPagingSOS`;
		alarm["delete_endpoint"]= `${process.env.URL_DEPLOY}/alarms/deletePagingSOS`;
	});

	ctx.body = alarms;
});


/* ENDPOINT 5.9.9 DOC */ 
//Modificado para SOS
//Retorna la cantidad de alarmas que hay en SOS
router.post('/getSOSCount', async (ctx) => {
    var myHeaders = new fetch.Headers();
	myHeaders.append("Cookie", ctx.header["cookie"]);
    myHeaders.append('Content-Type' , 'application/x-www-form-urlencoded')
    var formBody = ctx.request.body;
    formBody["type"] = [6];
    var formBody = new URLSearchParams(formBody).toString();
    
	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
        body: formBody
	};

	var alarms = await fetch(`${process.env.URL_API}/EHCommon/ModularAlarm/AlarmAPI/getHelpCount`, requestOptions)
		.then(function(response){
			return response.json()
		})
		.catch(error => console.log('error', error));

	ctx.body = alarms;
});


/* ENDPOINT 5.9.9 DOC */ 
//Modificado para Paging Record
//Retorna la cantidad de alarmas que hay en paging record
router.post('/getPagingRecordCount', async (ctx) => {
    var myHeaders = new fetch.Headers();
	myHeaders.append("Cookie", ctx.header["cookie"]);
    myHeaders.append('Content-Type' , 'application/x-www-form-urlencoded')
    var formBody = ctx.request.body;
    formBody["type"] = [5,7];
    var formBody = new URLSearchParams(formBody).toString();
    
	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
        body: formBody
	};

	var alarms = await fetch(`${process.env.URL_API}/EHCommon/ModularAlarm/AlarmAPI/getHelpCount`, requestOptions)
		.then(function(response){
			return response.json()
		})
		.catch(error => console.log('error', error));

	ctx.body = alarms;
});



/* ENDPOINT 5.9.11 DOC */
//Elimina tanto SOS como Paging Record hay que pasarle el id
router.post('/deletePagingSOS', async (ctx) => {
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

	var alarms = await fetch(`${process.env.URL_API}/EHCommon/ModularAlarm/AlarmAPI/deleteHelp`, requestOptions)
		.then(function(response){
			return response.json()
		})
		.catch(error => console.log('error', error));

	ctx.body = alarms;
});


/* ENDPOINT 5.9.12 DOC */ //No existe en la documentación
//Cambia el estado de los SOS requiere de su id y el nuevo estasdo 0=no procesado, 1=procesado
router.post('/updateStatusSOS', async (ctx) => {
    var myHeaders = new fetch.Headers();
	myHeaders.append("Cookie", ctx.header["cookie"]);
    myHeaders.append('Content-Type' , 'application/x-www-form-urlencoded')
    var formBody = ctx.request.body;
    formBody["alarm_ids[0]"] = formBody["id"];
    delete formBody['id'];
    var formBody = new URLSearchParams(formBody).toString();
    
	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
        body: formBody
	};

	var alarms = await fetch(`${process.env.URL_API}/EHCommon/ModularAlarm/AlarmAPI/batchHelpProcessing`, requestOptions)
		.then(function(response){
			return response.json()
		})
		.catch(error => console.log('error', error));

	ctx.body = alarms;
});

/* ENDPOINT 5.9.13 DOC */ //No existe en la documentación
//Cambia el comentario de un SOS o Paging, requiere del id y del comment
router.post('/updateCommentPagingSOS', async (ctx) => {
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

	var alarms = await fetch(`${process.env.URL_API}/EHCommon/ModularAlarm/AlarmAPI/updateHelp`, requestOptions)
		.then(function(response){
			return response.json()
		})
		.catch(error => console.log('error', error));

	ctx.body = alarms;
});

module.exports = router;