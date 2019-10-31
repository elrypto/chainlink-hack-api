const routesNumber = require('./routesNumber');
const routesCreate = require('./routesCreate');

module.exports = function(app, db){
  routesNumber(app, db);
  routesCreate(app, db);
}