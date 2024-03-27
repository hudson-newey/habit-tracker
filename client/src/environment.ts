import { customServerStorageKey } from "./app/services/clientConfig/client-config.service";

interface IEnvironment {
  endpoint: string;
}

export const environment: IEnvironment = {
  endpoint: localStorage.getItem(customServerStorageKey) ?? "",
};
