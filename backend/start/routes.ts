/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import UsersController from '#controllers/users_controller';

router.get('/', async (ctx) => {
  const usersController = new UsersController()
  return usersController.index(ctx)
})
