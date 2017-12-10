import { UUID } from 'angular2-uuid';

export class User {
    public key: string = UUID.UUID();
    public _id: string;
    public username: string;
    public password: string;
    public token: string;
    public firstname: string;
    public lastname: string;
    public address: string;
    public city: string;
    public zip: string;
    public phone: string;

    constructor() {
    }
}
