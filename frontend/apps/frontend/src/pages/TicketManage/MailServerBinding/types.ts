export type EmailServer = 'Google' | 'Microsoft' | 'Freshdesk';

export interface EmailAccount {
  serverName: EmailServer;
  name: string;
  email: string;
  status: string;
}
