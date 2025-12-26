
import { User } from '../types';

const STORAGE_KEY = 'aws_saa_hub_users';

export const getStoredUsers = (): Record<string, User> => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
};

export const saveUser = (user: User) => {
  const users = getStoredUsers();
  users[user.email] = user;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

export const updateUserData = (email: string, updates: Partial<User>) => {
  const users = getStoredUsers();
  if (users[email]) {
    users[email] = { ...users[email], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    return users[email];
  }
  return null;
};
