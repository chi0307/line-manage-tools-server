import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Message from 'App/Models/Message';

export default class MessagesController {
  public async getMessages() {
    let messages = Message.all();
    return messages;
  }

  public async insertMessage({ request, response }: HttpContextContract) {
    const messageName: string = request.input('messageName');
    const messageContent: JSON = request.input('messageContent');

    return Message.create({ message_name: messageName, message_content: JSON.stringify(messageContent) })
      .then((message) => {
        message.message_content = JSON.parse(message.message_content);
        response.send(message);
      })
      .catch((err) => {
        response.status(400).send(err);
      });
  }

  public async patchMessage({ params, request, response }: HttpContextContract) {
    const messageId: string = params.messageId;
    const messageName: string = request.input('messageName');
    const messageContent: JSON = request.input('messageContent');

    return Message.findOrFail(messageId)
      .then((message) => {
        message.message_name = messageName;
        message.message_content = JSON.stringify(messageContent);
        return message.save();
      })
      .then((message) => {
        message.message_content = JSON.parse(message.message_content);
        response.send(message);
      })
      .catch((err) => {
        response.status(400).send(err);
      });
  }

  public async deleteMessage({ params, response }: HttpContextContract) {
    const messageId: string = params.messageId;

    return Message.findOrFail(messageId)
      .then((message) => {
        return message.delete();
      })
      .then((result) => {
        response.send(result);
      })
      .catch((err) => {
        response.status(400).send(err);
      });
  }
}
