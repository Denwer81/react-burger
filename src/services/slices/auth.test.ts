import { IAuth } from '../types/auth';
import { REQUEST_STATUS } from '../types/types';
import reducer, {
  fetchRegister,
  fetchLogin,
  fetchLogout,
  fetchGetUser,
  fetchUpdateUser,
  fetchUpdateAccessToken,
  setError,
} from './auth';

const initialState: IAuth = {
  isAuth: false,
  user: {
    email: "",
    name: "",
  },

  loadingStatus: 'idle',
  error: null,
}

const user = {
  email: 'email',
  name: 'name',
}

describe("auth slice", () => {
  test("Should sets fetchRegister checkout is pending", () => {
    const action = { type: fetchRegister.pending.type }
    const state = reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      error: null,
      loadingStatus: REQUEST_STATUS.loading
    })
  });

  test("Should sets fetchRegister checkout is rejected", () => {
    const action = {
      type: fetchRegister.rejected.type,
      payload: {
        message: 'error'
      }
    }
    const state = reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      error: 'error',
      loadingStatus: REQUEST_STATUS.error
    })
  });

  test("Should sets fetchRegister checkout is fulfilled", () => {
    const action = {
      type: fetchRegister.fulfilled.type,
      payload: {
        success: true,
        user,
      }
    }
    const state = reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      loadingStatus: REQUEST_STATUS.idle,
      isAuth: true,
      user,
    })
  });

  test("Should sets fetchLogin checkout is pending", () => {
    const action = { type: fetchLogin.pending.type }
    const state = reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      error: null,
      loadingStatus: REQUEST_STATUS.loading
    })
  });

  test("Should sets fetchLogin checkout is rejected", () => {
    const action = {
      type: fetchLogin.rejected.type,
      payload: {
        message: 'error'
      }
    }
    const state = reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      error: 'error',
      loadingStatus: REQUEST_STATUS.error
    })
  });

  test("Should sets fetchLogin checkout is fulfilled", () => {
    const action = {
      type: fetchLogin.fulfilled.type,
      payload: {
        success: true,
        user,
      }
    }
    const state = reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      loadingStatus: REQUEST_STATUS.idle,
      isAuth: true,
      user,
    })
  });

  test("Should sets fetchLogout checkout is pending", () => {
    const action = { type: fetchLogout.pending.type }
    const state = reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      error: null,
      loadingStatus: REQUEST_STATUS.loading
    })
  });

  test("Should sets fetchLogout checkout is rejected", () => {
    const action = {
      type: fetchLogout.rejected.type,
      payload: {
        message: 'error'
      }
    }
    const state = reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      error: 'error',
      loadingStatus: REQUEST_STATUS.error
    })
  });

  test("Should sets fetchLogout checkout is fulfilled", () => {
    const action = {
      type: fetchLogout.fulfilled.type,
      payload: {
        success: true,
      }
    }
    const state = reducer(initialState, action)

    expect(state).toEqual(initialState)
  });

  test("Should sets fetchGetUser checkout is pending", () => {
    const action = { type: fetchGetUser.pending.type }
    const state = reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      error: null,
      loadingStatus: REQUEST_STATUS.loading
    })
  });

  test("Should sets fetchGetUser checkout is rejected", () => {
    const action = {
      type: fetchGetUser.rejected.type,
      payload: {
        message: 'error'
      }
    }
    const state = reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      error: 'error',
      loadingStatus: REQUEST_STATUS.error
    })
  });

  test("Should sets fetchGetUser checkout is fulfilled", () => {
    const action = {
      type: fetchGetUser.fulfilled.type,
      payload: {
        success: true,
        user,
      }
    }
    const state = reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      loadingStatus: REQUEST_STATUS.idle,
      isAuth: true,
      user,
    })
  });

  test("Should sets fetchUpdateUser checkout is pending", () => {
    const action = { type: fetchUpdateUser.pending.type }
    const state = reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      error: null,
      loadingStatus: REQUEST_STATUS.loading
    })
  });

  test("Should sets fetchUpdateUser checkout is rejected", () => {
    const action = {
      type: fetchUpdateUser.rejected.type,
      payload: {
        message: 'error'
      }
    }
    const state = reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      error: 'error',
      loadingStatus: REQUEST_STATUS.error
    })
  });

  test("Should sets fetchUpdateUser checkout is fulfilled", () => {
    const action = {
      type: fetchUpdateUser.fulfilled.type,
      payload: {
        success: true,
        user,
      }
    }
    const state = reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      loadingStatus: REQUEST_STATUS.idle,
      isAuth: true,
      user,
    })
  });

  test("Should sets fetchUpdateAccessToken checkout is pending", () => {
    const action = { type: fetchUpdateAccessToken.pending.type }
    const state = reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      error: null,
      loadingStatus: REQUEST_STATUS.loading
    })
  });

  test("Should sets fetchUpdateAccessToken checkout is rejected", () => {
    const action = {
      type: fetchUpdateAccessToken.rejected.type,
      payload: {
        message: 'error'
      }
    }
    const state = reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      error: 'error',
      loadingStatus: REQUEST_STATUS.error
    })
  });

  test("Should sets fetchUpdateAccessToken checkout is fulfilled", () => {
    const action = {
      type: fetchUpdateAccessToken.fulfilled.type,
      payload: {
        success: true,
      }
    }
    const state = reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      loadingStatus: REQUEST_STATUS.idle,
    })
  });

  test("Should sets error", () => {
    const state = reducer(initialState, setError('error'))

    expect(state).toEqual({
      ...initialState,
      error: 'error',
    })
  });
})