import axios from 'axios';
import { Message } from '@line/bot-sdk';

const lineClient = axios.create({
  baseURL: 'https://api.line.me/v2/bot/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
  },
});

class LineMessageService {
  // 回覆訊息
  replyMessage(replyToken: string, messages: Message[]): Promise<object> {
    return lineClient.post('/message/reply', { replyToken, messages });
  }

  // 推播訊息
  pushMessage(lineId: string, messages: Message[]): Promise<object> {
    return lineClient.post('/message/push', { to: lineId, messages });
  }

  // 推播訊息（多人）
  sendMulticastMessage(lineIds: string[], messages: Message[]): Promise<object> {
    return lineClient.post('/message/multicast', { to: lineIds, messages });
  }

  // 廣播訊息
  sendBroadcastMessage(messages: Message[]): Promise<object> {
    return lineClient.post('/message/broadcast', { messages });
  }
}

export default new LineMessageService();
