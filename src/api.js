import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getMaterials = () => {
  return axios.get(`${API_URL}/materials`);
};

export const addMaterial = (material) => {
  return axios.post(`${API_URL}/materials`, material);
};

export const updateMaterial = (id, quantityUsed) => {
  return axios.put(`${API_URL}/materials/${id}`, { quantityUsed });
};

export const increaseMaterial = (id, quantityIncreased) => {
  return axios.patch(`${API_URL}/materials/${id}/increase`, { quantityIncreased });
};

export const deleteMaterial = (id) => {
  return axios.delete(`${API_URL}/materials/${id}`);
};