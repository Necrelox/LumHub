import { AbstractModels } from './AbstractModels';
import { IRoleDTO } from '@/DTO/Models/';

export class RoleModel extends AbstractModels<IRoleDTO>{
    constructor() {
        super('role');
    }
}
