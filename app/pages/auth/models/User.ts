export interface User {
    id: number;
    nom: string;
    email: string;
    motdepasse: string;
    salt: string;
    etat: string;
    datecreation: string;
    datesuppression: string | null;
}