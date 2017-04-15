var categoriesController = require('../categories/categoriesController.js');
var userController = require('../users/userController.js');


module.exports = function(app, express) {

////////////////////these are the categories routes/////////////////////
  // get all categories from main collection
  app.get('/api/categories', categoriesController.getCategories);
  //randomize order of beliefs in categories
  app.post('/api/getrandombelief', categoriesController.getRandomBelief);
  //add a belief to an existing category
  app.post('/api/addbelief', categoriesController.addBelief);

///////////////////these are the user authentication routes//////////////
  // post already signed up user
  app.post('/api/users/signin', userController.signin);
  // post new user
  app.post('/api/users/signup', userController.signup);
  // check user authentication
  app.get('/api/users/signedin', userController.checkAuth);
  //delete a user
  app.delete('/api/users/delete', userController.deleteUser);

/////////////////////these are the user category routes////////////////////
  app.get('/api/usercategories', userController.getUserCategories);
  // create new category specific only to that user
  app.post('/api/addusercategories', userController.addUserCategory);
  // add belief to existing user category
  app.post('/api/adduserbelief', userController.addUserBelief);
  //adds beliefs on main user profile
  app.post('/api/addmainbeliefs', userController.addMainBeliefs);
  //adding a SINGLE belief to the user's mainBeliefs field
  app.post('/api/addmainbelief', userController.addMainBelief);
  //change an existing user belief
  app.put('/api/updateaddeduserbelief', userController.updateAddedBelief);
  //delete an added user category
  app.delete('/api/removeusercategory', userController.removeUserCategory);



};