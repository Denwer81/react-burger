import reducer, { fetchPostOrder, fetchGetOrder } from './order';
import { REQUEST_STATUS } from '../types/types';
import { IOrderState } from '../types/order';

const initialState: IOrderState = {
  orderName: undefined,
  orderNumber: undefined,

  loadingStatus: 'idle',
  error: null,
}

const errorMessage = 'error'
const order = {
  orderName: 'order',
  orderNumber: 12345,
}

describe('order slice', () => {
  test("Should return the initial state", () => {
    expect(reducer(undefined, { type: {} })).toEqual(initialState)
  })

  test("Should sets postOrder checkout is pending", () => {
    const action = { type: fetchPostOrder.pending.type }
    const state = reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      error: null,
      loadingStatus: REQUEST_STATUS.loading
    })
  })

  test("Should sets postOrder checkout is fulfilled", () => {
    const action = {
      type: fetchPostOrder.fulfilled.type,
      payload: {
        success: true,
        name: order.orderName,
        order: {
          number: order.orderNumber
        },
      }
    }
    const state = reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      ...order
    })
  })

  test("Should sets postOrder checkout is rejected", () => {
    const action = {
      type: fetchPostOrder.rejected.type,
      payload: {
        message: errorMessage,
      }
    }
    const state = reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      error: errorMessage,
      loadingStatus: REQUEST_STATUS.error
    })
  })


  test("Should sets getOrder checkout is pending", () => {
    const action = { type: fetchGetOrder.pending.type }
    const state = reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      error: null,
      loadingStatus: REQUEST_STATUS.loading
    })
  })

  test("Should sets getOrder checkout is fulfilled", () => {
    const action = {
      type: fetchGetOrder.fulfilled.type,
      payload: {
        success: true,
        orders: [{
          name: order.orderName,
          number: order.orderNumber,
        }],
      }
    }
    const state = reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      ...order
    })
  })

  test("Should sets getOrder checkout is rejected", () => {
    const action = {
      type: fetchGetOrder.rejected.type,
      payload: {
        message: errorMessage,
      }
    }
    const state = reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      error: errorMessage,
      loadingStatus: REQUEST_STATUS.error
    })
  })
})
