import fs from 'node:fs';
import path from 'node:path';

import { Injectable, type OnModuleInit } from '@nestjs/common';

import yaml from 'js-yaml';

@Injectable()
class MessagesHelper implements OnModuleInit {
  private messages: Record<string, string> = {};

  onModuleInit() {
    this.loadMessages();
  }

  private loadMessages() {
    const messagesPaths = path.join(process.cwd(), 'data', 'messages');
    const isExistPath = fs.existsSync(messagesPaths);

    if (!isExistPath) return;

    const files = fs.readdirSync(messagesPaths).filter((file) => file.endsWith('.yml'));

    files.forEach((file) => {
      const filePath = path.join(messagesPaths, file);
      const content = fs.readFileSync(filePath, 'utf8');

      const doc = yaml.load(content);

      const namespace = path.parse(file).name;
      this.messages[namespace] = doc as string;
    });
  }

  get(key: string, data?: Record<string, string | number>): string {
    const [namespace, property] = key.split('.');
    const rawMessage = this.messages[namespace]?.[property] as unknown;
    if (!rawMessage || typeof rawMessage !== 'string') return key;

    let message = rawMessage;

    if (data) {
      message = message.replace(/:(\w+)/g, (match, variableName: string) => {
        const value = data[variableName];
        return value !== undefined ? String(value) : match;
      });
    }

    return message;
  }
}

export default MessagesHelper;
