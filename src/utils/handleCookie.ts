function setCookie(name: string, value?: string | null, props?: { [key: string]: any, path?: string }) {
  // props = props || {};
  let exp = props!.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props!.expires = d;
  }
  if (exp && exp.toUTCString) {
    props!.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value!);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
};

function getCookie(name: string) {
  const matches = document.cookie.match(
    /* eslint-disable no-useless-escape */
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name: string) {
  setCookie(name, null, { expires: -1 });
}

const setAccessToken = (accessToken: string) => {
  setCookie('accessToken', accessToken, { expires: 60 * 60 * 24 * 7, path: '/' });
}

const setRefreshToken = (refreshToken: string) => {
  setCookie('refreshToken', refreshToken, { expires: 60 * 60 * 24 * 7, path: '/' });
}

export {
  setCookie,
  getCookie,
  deleteCookie,
  setAccessToken,
  setRefreshToken,
}
