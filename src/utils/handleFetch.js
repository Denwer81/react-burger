function handleFetch({ url, method = 'GET', token = null }, data = null) {
  const options = {
    method,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? token : null,
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: data ? JSON.stringify(data) : null,
  };

  const request = new Request(`${url}`, options);

  return fetch(request);
}

// export const checkResponseRedux = async (res, rejectWithValue = null) => {
//   try {
//     const response = await res;
//     if (!response.status) {
//       throw new Error(response.message || 'Server Error!')
//     }
//     return response.json();

//   } catch (error) {
//     return rejectWithValue({ status: false, message:error.message })
//   }
// }

// export const checkResponseRedux = async (res, rejectWithValue) => {
//   try {
//     const response = await res;
//     if (response.status === 404) {
//       throw new Error(response.message || 'Server Error!')
//     }
//     return response.json();

//   } catch (error) {
//     return rejectWithValue({ status: false, message:error.message })
//   }
// }

export const checkResponseRedux = async (res, rejectWithValue) => {
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
