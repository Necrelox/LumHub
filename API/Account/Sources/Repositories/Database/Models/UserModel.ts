import { AbstractModels } from './AbstractModels';
import { IUserDTO } from '@/DTO/Models/IUserDTO';

export class UserModel extends AbstractModels<IUserDTO>{
    constructor() {
        super('user');
    }
}
