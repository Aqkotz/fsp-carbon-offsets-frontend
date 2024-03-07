export function getToken() {
  return localStorage.getItem('token_fsp_carbon_offsets');
}

export function storeToken(token) {
  localStorage.setItem('token_fsp_carbon_offsets', token);
}

export function removeToken() {
  localStorage.removeItem('token_fsp_carbon_offsets');
}

export function getAuthHeader() {
  const token = getToken();
  return {
    headers: {
      Authorization: token,
    },
  };
}
