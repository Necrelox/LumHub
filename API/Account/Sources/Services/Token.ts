import { IBasicUserForTokenDTO, IBasicTokenDTO, ISanitizeRoleAndPermissionDTO } from '@/DTO/Services';
import { generateKeyPairSync, sign, verify, randomUUID } from 'crypto';

interface IKeyPairED25519 {
    publicKey: string;
    privateKey: string;
    passphrase: string;
}

export class Token {
    private generateKeyPairED25519() : IKeyPairED25519 {
        const passphrase: string = randomUUID();
        const keyPair = generateKeyPairSync('ed25519', {
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
                passphrase,
                cipher: 'aes-256-cbc'
            }
        });
        return {
            ...keyPair,
            passphrase
        };
    }

    private createHeader(): string {
        return Buffer.from(JSON.stringify({
            exp: new Date(Date.now() + (1000 * 60 * 60)),
        })).toString('base64');
    }

    private createPayload(username: string, sanitizeRoleAndPermissionDTO: ISanitizeRoleAndPermissionDTO): string {
        return Buffer.from(JSON.stringify({
            username,
            role: sanitizeRoleAndPermissionDTO,
        })).toString('base64');
    }

    private createSignature(header: string, payload: string, privateKey: string, passPhrase: string): string {
        return sign(null, Buffer.from(header + '.' + payload), {
            key: privateKey,
            passphrase: passPhrase,
        }).toString('base64');
    }

    public async generateToken(basicUserForTokenDTO: IBasicUserForTokenDTO, sanitizeRoleAndPermissionDTO: ISanitizeRoleAndPermissionDTO): Promise<IBasicTokenDTO> {
        const keyPair = this.generateKeyPairED25519();
        const header: string = this.createHeader();
        const payload: string = this.createPayload(basicUserForTokenDTO.username, sanitizeRoleAndPermissionDTO);
        const signature: string = this.createSignature(header, payload, keyPair.privateKey, keyPair.passphrase);

        return {
            token: `${header}.${payload}.${signature}`,
            publicKey: keyPair.publicKey,
        };
    }

    public async verifyToken(token: string, publicKey: string): Promise<boolean> {
        const [header, payload, signature] = token.split('.');
        return verify(null, Buffer.from(header + '.' + payload), publicKey, Buffer.from(signature as string, 'base64'));
    }
}