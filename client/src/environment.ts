import { customServerStorageKey } from "./app/services/clientConfig/client-config.service";

interface IEnvironment {
  production: boolean;
  endpoint: string;
}

export const environment: IEnvironment = {
  production: false,
  endpoint: localStorage.getItem(customServerStorageKey) ?? "",
};
