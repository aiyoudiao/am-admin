import { httpRequest } from '@/utils/umiRequest';

export const fetchAll = (index: string) => httpRequest.get(`/elasticsearch/elastic/${index}`);

export const createDocument = (index: string, document: any) =>
  httpRequest.post(`/elasticsearch/elastic/${index}`, document);

export const updateDocument = (index: string, id: string, document: any) =>
  httpRequest.put(`/elasticsearch/elastic/${index}/${id}`, document);

export const deleteDocument = (index: string, id: string) =>
  httpRequest.delete(`/elasticsearch/elastic/${index}/${id}`);

export const searchDocuments = (index: string, query: any) =>
  httpRequest.post(`/elasticsearch/elastic/search/${index}`, query);

export const getDocument = (index: string, id: string) =>
  httpRequest.get(`/elasticsearch/elastic/${index}/${id}`);

export const checkHealth = () => httpRequest.get(`/elasticsearch/elastic-health`);
