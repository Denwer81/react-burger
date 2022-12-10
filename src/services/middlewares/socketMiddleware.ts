import { TFeedPayload } from './../types/feed';
import { baseUrlWss } from './../../utils/constants';
import { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from './../slices/index';
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';

export type TwsAction = {
  wsConnect: ActionCreatorWithPayload<string>,
  wsDisconnect: ActionCreatorWithoutPayload,
  wsConnecting: ActionCreatorWithoutPayload,
  wsConnectionOpen: ActionCreatorWithoutPayload,
  wsConnetionClosed: ActionCreatorWithoutPayload,
  wsConnectionError: ActionCreatorWithPayload<string>,
  wsMessage: ActionCreatorWithPayload<TFeedPayload>,
}

export const createSocketMiddleware = (wsActions: TwsAction): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    let url = '';

    return next => action => {
      const { dispatch } = store;
      const {
        wsConnect,
        wsConnecting,
        wsDisconnect,
        wsConnectionOpen,
        wsConnectionError,
        wsConnetionClosed,
        wsMessage,
      } = wsActions;

      if (wsConnect.match(action)) {
        url = baseUrlWss + action.payload;
        socket = new WebSocket(url);
        dispatch(wsConnecting())
      }

      if (socket) {
        socket.onopen = () => {
          console.log('Websocket connect')
          dispatch(wsConnectionOpen())
        }

        socket.onerror = () => {
          dispatch(wsConnectionError('Websocket error'))
        }

        socket.onmessage = (event) => {
          const { data } = event
          const parsedData = JSON.parse(data)
          dispatch(wsMessage(parsedData))
        }

        socket.onclose = (event) => {
          if (event.code !== 1000 && event.code !== 1005) {
            dispatch(wsConnectionError(event.code.toString()))
          }
        }

        if (wsConnetionClosed.match(action)) {
          console.log('Websocket disconnect')
          dispatch(wsDisconnect())
          socket.close()
        }
      }

      next(action);
    };
  };
};
