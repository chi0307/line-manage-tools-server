import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';

export default class UsersController {
  public async getUsers() {
    let users = User.all();
    return users;
  }

  public async insertUser({ request, response }: HttpContextContract) {
    const username: string = request.input('username');
    const password: string = request.input('password');

    return User.create({ username, password })
      .then((user) => {
        response.send(user);
      })
      .catch((err) => {
        response.status(400).send(err);
      });
  }

  public async patchUser({ params, request, response }: HttpContextContract) {
    const userId: string = params.userId;
    const password: string = request.input('password');

    return User.findOrFail(userId)
      .then((user) => {
        if (!password) {
          return Promise.reject();
        }
        user.password = password;
        return user.save();
      })
      .then((user) => {
        response.send(user);
      })
      .catch((err) => {
        response.status(400).send(err);
      });
  }

  public async deleteUser({ params, auth, response }: HttpContextContract) {
    const userId: string = params.userId;
    const loginUser = auth.user;

    return User.findOrFail(userId)
      .then((user) => {
        if (!loginUser || user.id === loginUser.id) {
          return Promise.reject();
        }
        return user.delete();
      })
      .then((result) => {
        response.send(result);
      })
      .catch((err) => {
        response.status(400).send(err);
      });
  }
}
