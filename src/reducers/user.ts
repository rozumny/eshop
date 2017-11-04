import { Action } from '@ngrx/store';
import { User } from '../models/user';

export const SETUSER = 'SETUSER';

export const user = (status: User, action: Action) => {
    switch (action.type) {
        case SETUSER:
            return action.payload;
        default:
            return status;
    }
};
