import axios from 'axios';

export const CommentsAPI = {
  getComments: (id: number) => {
    return axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/comments/${id}`
    );
  },
};
