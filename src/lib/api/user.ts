import axios from 'axios';

export const UserAPI = {
  getUserData: (id: number) => {
    return axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/${id}`);
  },
  getAllUserIds: () =>
    axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/users/ids`),

  getUsersByName: (name: string, orderByName: boolean) => {
    const order = orderByName ? 'name' : 'id';
    return axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/users?q=${name}&orderBy=${order}`
    );
  },
  deleteUser: (id: number) =>
    axios.delete(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/${id}`),
};
