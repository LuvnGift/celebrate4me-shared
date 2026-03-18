import { ChatMessageRole } from './common.types';

export interface ChatSession {
  id: string;
  userId: string;
  isEscalated: boolean;
  isResolved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  role: ChatMessageRole;
  content: string;
  createdAt: Date;
}

export interface ChatSessionWithMessages extends ChatSession {
  messages: ChatMessage[];
}
