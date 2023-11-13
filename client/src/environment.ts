interface IEnvironment {
  production: boolean;
  endpoint: string;
}

export const environment: IEnvironment = {
  production: true,
  endpoint: "http://localhost:8081",
};
