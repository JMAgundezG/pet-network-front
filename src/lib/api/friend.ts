import axios from 'axios';

export const FriendAPI = {
  getFriends: (id: number) => {
    return axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/friend/${id}`);
  },
};
