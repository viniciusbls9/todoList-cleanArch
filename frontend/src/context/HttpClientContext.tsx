import { createContext, PropsWithChildren, useContext } from 'react';
import TodosGateway from '@infra/gateway/TodosGateway';
import TodosGatewayHttp from '@infra/gateway/TodosGatewayHttp';
import FetchAdapter from '@infra/http/FetchAdapter';

const httpClientInstance = new FetchAdapter();

export type HttpClientType = {
  habitGateway: TodosGateway;
};

const defaultContext: HttpClientType = {
  habitGateway: new TodosGatewayHttp(
    httpClientInstance,
    'http://localhost:3000'
  )
};

export const HttpClientContext = createContext(defaultContext);

export const HttpClientProvider = ({ children }: PropsWithChildren) => {
  const habitGateway = new TodosGatewayHttp(
    httpClientInstance,
    'http://localhost:3000'
  );

  return (
    <HttpClientContext.Provider value={{ habitGateway }}>
      {children}
    </HttpClientContext.Provider>
  );
};

export const useHttpClient = () => {
  return useContext(HttpClientContext);
};