import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class AuthController {
  public async login({ request, auth }: HttpContextContract) {
    const username = request.input('username');
    const password = request.input('password');

    const token = await auth.use('api').attempt(username, password, {
      expiresIn: '1h',
    });
    return token.toJSON();
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').logout();
    return null;
  }
}
