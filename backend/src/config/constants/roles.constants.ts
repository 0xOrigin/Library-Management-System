export const ROLES_KEY = 'roles';
export const Role = {
    ADMIN: 'admin',
    BORROWER: 'borrower',
} as const;
export type ROLE_TYPE = Readonly<typeof Role[keyof typeof Role]>;
