var router = new require("express").Router();

var index = require('./routes/index');
var deviceCardApi = require('./routes/deviceCardApi');
var baseStationApi = require('./routes/baseStationApi');
var itcRadioApi = require('./routes/itcRadioApi');
var modularCompanyApi = require('./routes/modularCompanyApi');
var attendanceApi = require('./routes/attendanceApi');
var sesion = require('./routes/sesion');
var modularAreaApi = require('./routes/modularAreaApi');
var alarmApi = require('./routes/alarmApi');


router.use('/', index);
router.use('/devicecardapi', deviceCardApi);
router.use('/cards', deviceCardApi);
router.use('/baseStationApi', baseStationApi);
router.use('/itcRadioApi', itcRadioApi);
router.use('/modularcompanyapi', modularCompanyApi);
router.use('/attendanceApi', attendanceApi);
router.use('/users', sesion);
router.use('/alarms', alarmApi);
router.use('/modulararea', modularAreaApi);


module.exports = router;

