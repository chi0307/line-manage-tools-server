/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route';

// 資料庫連接測試
// import HealthCheck from '@ioc:Adonis/Core/HealthCheck';
// Route.get('/health', async ({ response }) => {
//   const report = await HealthCheck.getReport();

//   return report.healthy ? response.ok(report) : response.badRequest(report);
// });

Route.group(() => {
  Route.post('/login', 'AuthController.login');

  Route.group(() => {
    Route.post('/logout', 'AuthController.logout');
    // UsersController
    Route.get('/users', 'UsersController.getUsers');
    Route.post('/user', 'UsersController.insertUser');
    Route.patch('/user/:userId', 'UsersController.patchUser');
    Route.delete('/user/:userId', 'UsersController.deleteUser');
    // MessagesController
    Route.get('/messages', 'MessagesController.getMessages');
    Route.post('/message', 'MessagesController.insertMessage');
    Route.patch('/message/:messageId', 'MessagesController.patchMessage');
    Route.delete('/message/:messageId', 'MessagesController.deleteMessage');
  }).middleware('auth');
})
  .prefix('/api')
  .middleware('acl');
