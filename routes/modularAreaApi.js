var router = new require("express").Router();
var axios = require("axios");


/* ENDPOINT 5.6.1 */
router.post('/AlarmRuleAPI/getCard', async (ctx) => {
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
	var card = await fetch(`${process.env.URL_API}/EHCommon/ModularArea/AlarmRuleAPI/getCard`, requestOptions)
	.then(function(response){
		return response.json()
	})
	.catch(error => console.log('error', error));

	ctx.body = card;
});

/* ENDPOINT 5.6.2 */
router.post('/AlarmRuleAPI/getAlarmRule', async (ctx) => {
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
	var get_rules = await fetch(`${process.env.URL_API}/EHCommon/ModularArea/AlarmRuleAPI/getAlarmRule`, requestOptions)
	.then(function(response){
		return response.json()
	})
	.catch(error => console.log('error', error));

	get_rules["result"].forEach(function(rule) {
		var type = rule["type"];
		if (type == 1){
			rule["type"] = "Entrance is allowed only";
		} else if (type == 2){
			rule["type"] = "Entrance is refused only";
		} else if (type == 3){
			rule["type"] = "Exit is allowed only";
		} else if (type == 4){
			rule["type"] = "Exit is refused only";
		} else if (type == 5){
			rule["type"] = "Area timeout";
		} else if (type == 6){
			rule["type"] = "Area still";
		} else if (type == 7){
			rule["type"] = "Area disappeared";
		} else if (type == 8){
			rule["type"] = "Gathering alarm";
		} else if (type == 13){
			rule["type"] = "Limit of person number";
		};

		rule["edit_url"] = `${process.env.URL_DEPLOY}/modularArea/AlarmRuleAPI/updateAlarmRule`;
		rule["delete_url"] = `${process.env.URL_DEPLOY}/modularArea/AlarmRuleAPI/deleteAlarmRule`;
	});

	ctx.body = get_rules;
});

/* ENDPOINT 5.6.3 */
router.post('/AlarmRuleAPI/getCount', async (ctx) => {
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
	var rules_count = await fetch(`${process.env.URL_API}/EHCommon/ModularArea/AlarmRuleAPI/getCount`, requestOptions)
	.then(function(response){
		return response.json()
	})
	.catch(error => console.log('error', error));

	ctx.body = rules_count;
});

/* ENDPOINT 5.6.4 */
router.post('/AlarmRuleAPI/addAlarmRule', async (ctx) => {
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
	var added_rule = await fetch(`${process.env.URL_API}/EHCommon/ModularArea/AlarmRuleAPI/addAlarmRule`, requestOptions)
	.then(function(response){
		return response.json()
	})
	.catch(error => console.log('error', error));

	ctx.body = added_rule;
});

/* ENDPOINT 5.6.5 */
router.post('/AlarmRuleAPI/updateAlarmRule', async (ctx) => {
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
	var updated_rule = await fetch(`${process.env.URL_API}/EHCommon/ModularArea/AlarmRuleAPI/updateAlarmRule`, requestOptions)
	.then(function(response){
		return response.json()
	})
	.catch(error => console.log('error', error));

	ctx.body = updated_rule;
});

/* ENDPOINT 5.6.5 */
router.post('/AlarmRuleAPI/deleteAlarmRule', async (ctx) => {
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
	var deleted_rule = await fetch(`${process.env.URL_API}/EHCommon/ModularArea/AlarmRuleAPI/deleteAlarmRule`, requestOptions)
	.then(function(response){
		return response.json()
	})
	.catch(error => console.log('error', error));

	ctx.body = deleted_rule;
});


module.exports = router;