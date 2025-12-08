// src/utils/storage.js

const KEY = "favorites";

// Recupera favoritos do localStorage
export function getFavorites() {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

// Salva favoritos no localStorage
export function setFavorites(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
  return items;
}

// Alterna (adiciona/remove) um item nos favoritos
export function toggleFavorite(item) {
  const favorites = getFavorites();
  const exists = favorites.find((f) => f.id === item.id);

  let updated;
  if (exists) {
    updated = favorites.filter((f) => f.id !== item.id);
  } else {
    updated = [...favorites, item];
  }

  return setFavorites(updated);
}
