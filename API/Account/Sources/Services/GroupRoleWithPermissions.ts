import { IRawRoleAndPermissionDTO, ISanitizeRoleAndPermissionDTO } from '@/DTO/Services';

export class GroupRoleWithPermissions {
    public execute(rawRoleAndPermissionDTO: IRawRoleAndPermissionDTO[]): ISanitizeRoleAndPermissionDTO {
        const sanitizeRolePermission: ISanitizeRoleAndPermissionDTO = {};

        while (rawRoleAndPermissionDTO.length > 0) {
            const element: Pick<IRawRoleAndPermissionDTO, 'role'> = rawRoleAndPermissionDTO[0] ? rawRoleAndPermissionDTO[0] : { role: '' };
            const tmp: IRawRoleAndPermissionDTO[] =
                rawRoleAndPermissionDTO.filter((e: Pick<IRawRoleAndPermissionDTO, 'role'>) => e.role === element.role);
            sanitizeRolePermission[element.role] = tmp.map((e: Pick<IRawRoleAndPermissionDTO, 'permission'>) => e.permission);
            rawRoleAndPermissionDTO = rawRoleAndPermissionDTO.filter((e: Pick<IRawRoleAndPermissionDTO, 'role'>) => e.role !== element.role);
        }
        return sanitizeRolePermission;
    }
}