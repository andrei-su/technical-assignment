const users = [];

const addUser = ({ id, name }) => {
  name = name.trim().toLowerCase();

  // Only in development mode | remove in production
  const existingUser = users.find((user) => user.name === name && user.id !== id);
  // const existingUser = users.find((user) => user.name === name);

  if(!name) return { error: 'Username is required.' };
  if(existingUser) return { error: 'Username is taken.' };

  const user = { id, name };

  users.push(user);

  return { user };
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsers = () => users;

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

export { addUser, removeUser, getUser, getUsers, getUsersInRoom };