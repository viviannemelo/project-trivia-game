export const LOGIN = 'LOGIN';
export const login = (name, gravatarEmail) => ({
  type: LOGIN,
  name,
  gravatarEmail,
});
