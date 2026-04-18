/**
 * authStorage
 * -----------
 * Helpers mínimos para leer y escribir la sesión del tutor en localStorage.
 *
 * POR QUÉ:
 * Así evitamos strings mágicos repetidos en hooks, servicios y páginas.
 */
const TOKEN_STORAGE_KEY = "lk_token";
const TUTOR_STORAGE_KEY = "lk_tutor";

// Si el JSON está roto, preferimos devolver null y no tumbar la app.
const parseStoredJson = (value) => {
  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

export const getStoredToken = () => localStorage.getItem(TOKEN_STORAGE_KEY);

export const getStoredTutor = () =>
  parseStoredJson(localStorage.getItem(TUTOR_STORAGE_KEY));

export const saveTutorSession = ({ token, tutor }) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
  localStorage.setItem(TUTOR_STORAGE_KEY, JSON.stringify(tutor));
};

export const clearTutorSession = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(TUTOR_STORAGE_KEY);
};

export const hasStoredSession = () => Boolean(getStoredToken());
