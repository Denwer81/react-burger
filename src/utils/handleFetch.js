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



  return fetch(request)
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return res.json()
        .then((res) => {
          throw new Error(res.message);
        });
    })
    .catch(error => {
      console.log(error);
      return error
    });
}

export default handleFetch;
