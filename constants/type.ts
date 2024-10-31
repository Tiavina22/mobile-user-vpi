import { NavigatorScreenParams } from '@react-navigation/native';

export interface User {
    id: number;
    nom: string;
    email: string;
}

export type RootStackParamList = {
    index: undefined;
    'pages/register': undefined;
    'pages/login': undefined;
    'pages/createUser': undefined;
    'pages/home': undefined;
    'pages/updateUser': { user: User; onUpdateSuccess?: () => void; };
    'UserList': undefined;
};