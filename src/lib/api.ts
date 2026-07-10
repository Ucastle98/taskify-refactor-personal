import axios from 'axios';

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}`,
  headers: {
    'Content-Type': 'application/json',
  },
});
