import axios from "axios";

import { REACT_APP_API_KEY } from "@env";

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${REACT_APP_API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;

  return token;
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}

export async function getUserData(idToken) {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${REACT_APP_API_KEY}`,
    {
      idToken: idToken,
    }
  );
  return response.data;
}
