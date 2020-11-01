// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class UsersController {
  public async getUsers() {
    const users = await User.all();
    return users;
  }
}
