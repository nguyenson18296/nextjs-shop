export interface IUser {
    id: number;
    username: string;
    email: string
    avatar?: string;
    role: 'admin' | 'user';
}
