interface IEnvironment {
    production: boolean;
    endpoint: string;
}

export const environment: IEnvironment = {
    production: false,
    endpoint: 'http://localhost:8081'
};
