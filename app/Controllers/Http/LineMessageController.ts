import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { Message } from '@line/bot-sdk';
import LineMessageService from 'App/Services/LineMessageService';

export default class LineMessageController {
  public pushMessages({ request }: HttpContextContract) {
    const lineId: string = request.input('lineId');
    const messages: Message[] = request.input('messages');

    LineMessageService.pushMessage(lineId, messages);
  }
}
