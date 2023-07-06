import axios from 'axios';

export const PetAPI = {
  getPets: (id: number) => {
    return axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/pets/${id}`);
  },
};
