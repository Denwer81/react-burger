interface IhandleFetch {
  url: string;
  method: string;
  token?: null | string;
}

function handleFetch({ url, method = 'GET', token = null }: IhandleFetch, data: any = null) {
  const requestHeaders: HeadersInit = new Headers();

  requestHeaders.set('Content-Type', 'application/json');
  if (token) {
    requestHeaders.append('Authorization', token);
  }

  const options: RequestInit = {
    method,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: requestHeaders,
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: data ? JSON.stringify(data) : null,
  };

  const request = new Request(`${url}`, options);

  return fetch(request);
}

export const checkResponseRedux = async(res, rejectWithValue) => {
  try {
    const response = await res

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Server Error!')
      } else {
        const error = await response.json();
        throw new Error(error.message)
      }
    }
    return response.json();

  } catch (error: any) {
    return rejectWithValue({ status: false, message: error.message })
  }
}

export const checkResponseReact = async (res) => {
  try {
    const response = await res

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Server Error!')
      } else {
        const error = await response.json();
        throw new Error(error.message)
      }
    }
    return response.json();

  } catch (error) {
    console.log(error.message)
    return error
  }
}

export default handleFetch;
