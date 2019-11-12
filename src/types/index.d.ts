declare interface IConfig {
  serve: string
  keys: string[]
  session: {
    key: string
  }
  work_wx: {
    corpId: string;
    agentId: string;
    agentSecret?: string;
  };
}

declare interface IMessage {
  message: string
  type: MSG_TYPE
  timestamp: number
}