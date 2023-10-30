export function getToken() {
  return localStorage.getItem('authToken');
}

export function setToken(token) {
  localStorage.setItem('authToken', token);
}

export function removeToken() {
  localStorage.removeItem('authToken');
}

export function getAuthHeader() {
  const token = getToken();
  return {
    headers: {
      Authorization: token,
    },
  };
}
