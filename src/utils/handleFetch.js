function handleFetch({ url, method, token }, data) {
  const header = method && token && data && {
    method: `${method}`,
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  }

  return fetch(`${url}`, header)
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return res.json().then((res) => {
        throw new Error(res);
      }
      );
    });
}

export default handleFetch;
