export type TOrderStatus = 'done' | 'pending' | 'created';

export enum WebsocketStatus {
  CONNECTING = 'CONNECTING...',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE'
}

export interface IWebsocketOrder {
  ingredients: string[];
  _id: string;
  status: TOrderStatus;
  name: 'string';
  number: number;
  createdAt: string;
  updateAt: string;
}

export interface IFeedState {
  wsStatus: WebsocketStatus;
  wsError: string;
  
  success: boolean;
  orders: IWebsocketOrder[];
  total: number;
  totalToday: number;
}

export type TFeedPayload = Omit<IFeedState, 'wsStatus' | 'wsError'>
