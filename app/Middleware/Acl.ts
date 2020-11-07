import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class Acl {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>, allowedRoles: string[]) {
    // let log = {
    //   ip: request.ip(),
    //   headers: request.headers(),
    //   body: request.all(),
    // };
    response.response.on('finish', () => {
      console.log(request.method(), request.url(), response.response.statusCode);
    });
    await next();
  }
}
