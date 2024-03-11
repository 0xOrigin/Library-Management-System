export const AUTH_HEADER_TYPES = ['Bearer',];
export const JWT_ACCESS_EXPIRES_IN = '1d';
export const JWT_REFRESH_EXPIRES_IN = '7d';
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_ACCESS_TOKEN_EXPIRES_IN_DATE = () => {
    return new Date(Date.now() + 1000 * 60 * 60 * 24 * 1);
};
export const JWT_REFRESH_TOKEN_EXPIRES_IN_DATE = () => {
    return new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
};
