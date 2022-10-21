function handleFetch({ url, method = 'GET', token = null }, data) {
  const body = JSON.stringify(data)
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer${token}`
  }

  return fetch(`${url}`, { method, body, headers })
    .then(res => {
      if (!res.ok) {
        throw new Error(res);
      }
      return res.json()
    })
    .catch(error => {
      console.log(error.message)
    });
}

export default handleFetch;
