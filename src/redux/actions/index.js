export const LOGIN = 'LOGIN';
export const SAVE_GRAVATAR = 'SAVE_GRAVATAR';

export const login = (name, gravatarEmail) => ({
  type: LOGIN,
  name,
  gravatarEmail,
});

export const saveGravatar = (gravatarImage) => ({
  type: SAVE_GRAVATAR,
  payload: gravatarImage,
});
