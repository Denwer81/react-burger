function handleFetch({ url, method, token }, data) {
  const Authorization = token ? `Bearer ${token}` : null;

  const header = method && data && {
    method: `${method}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization
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
