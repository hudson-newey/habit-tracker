interface IEnvironment {
  production: boolean;
  endpoint: string;
}

export const environment: IEnvironment = {
  production: true,
  endpoint: `http://${window.location.hostname}:8081`,
};
