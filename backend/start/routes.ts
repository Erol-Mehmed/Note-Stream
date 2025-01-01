/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router';

router.get('/check-token', async (ctx) => {
  console.log('check token>>', ctx.auth);

  return { isAuthenticated: !!ctx.auth.user };
});
