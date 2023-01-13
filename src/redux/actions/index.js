export const LOGIN = 'LOGIN';
export const SAVE_SCORE = 'SAVE_SCORE';

export const login = (name, gravatarEmail) => ({
  type: LOGIN,
  name,
  gravatarEmail,
});

export const saveScore = (points) => ({
  type: SAVE_SCORE,
  payload: points,
});
