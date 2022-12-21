import { IFeedState, WebsocketStatus } from '../types/feed';
import reducer, {
  wsConnecting,
  wsConnectionOpen,
  wsConnectionError,
  wsMessage,
} from './feed';

const initialState: IFeedState = {
  wsStatus: WebsocketStatus.OFFLINE,
  wsError: '',

  success: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

const feedPayload = {
  success: true,
  orders: [],
  total: 10,
  totalToday: 10,
}


describe('feed slice', () => {
  test("set status offline and return the initial state", () => {
    expect(reducer(undefined, { type: {} })).toEqual(initialState)
  });

  test("Should set status connecting", () => {
    const state = reducer(initialState, wsConnecting)

    expect(state).toEqual(({
      ...initialState,
      wsStatus: WebsocketStatus.CONNECTING,
    }))
  });
  test("Should set status online", () => {
    const state = reducer(initialState, wsConnectionOpen)

    expect(state).toEqual(({
      ...initialState,
      wsStatus: WebsocketStatus.ONLINE,
    }))
  });

  test("Should set status error", () => {
    const state = reducer(initialState, wsConnectionError('error'))

    expect(state).toEqual(({
      ...initialState,
      wsStatus: WebsocketStatus.OFFLINE,
      wsError: 'error'
    }))
  });

  test("Should set wsMessage", () => {
    const state = reducer(initialState, wsMessage(feedPayload))

    expect(state).toEqual(({
      ...initialState,
      ...feedPayload
    }))
  });
})
