import axios from 'axios';
import queryString from 'query-string';
import { SalesDataInterface } from 'interfaces/sales-data';
import { GetQueryInterface } from '../../interfaces';

export const getSalesData = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/sales-data${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createSalesData = async (salesData: SalesDataInterface) => {
  const response = await axios.post('/api/sales-data', salesData);
  return response.data;
};

export const updateSalesDataById = async (id: string, salesData: SalesDataInterface) => {
  const response = await axios.put(`/api/sales-data/${id}`, salesData);
  return response.data;
};

export const getSalesDataById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/sales-data/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSalesDataById = async (id: string) => {
  const response = await axios.delete(`/api/sales-data/${id}`);
  return response.data;
};
