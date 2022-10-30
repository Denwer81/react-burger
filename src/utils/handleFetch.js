function handleFetch({ url, method = 'GET', token = null }, data = null) {
  const options = {
    method,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer${token}` : null,
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: data ? JSON.stringify(data) : null,
  };

  const request = new Request(`${url}`, options);

  return fetch(request);
}

export const checkResponseRedux = async (res, rejectWithValue = null) => {
  try {
    const response = await res;

    if (response.status === 404) {
      throw new Error(response.message || 'Server Error!')
    }
    return response.json();

  } catch (error) {
    console.log(error)
    return rejectWithValue(error.message)
  }
}

export const checkResponseReact = async (res) => {
  const response = await res;

  return response.json();
}

export default handleFetch;
