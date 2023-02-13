import { randomBytes, scryptSync } from 'crypto';
import { ErrorEntity, MessageError } from '@/Errors/ErrorEntity';

export class Password {
    public hashPassword(password: string): Buffer {
        const salt: Buffer = randomBytes(32);
        const hash: Buffer = scryptSync(password, salt, 128);
        return Buffer.concat([salt, hash]);
    }

    public verifyPassword(password: string, hashedPassword: Buffer) {
        const salt: Buffer = hashedPassword.subarray(0, 32);
        const hash: Buffer = hashedPassword.subarray(32, 160);
        const newBuff: Buffer = scryptSync(password, salt, 128);
        if (!(hash.compare(newBuff) === 0))
            throw new ErrorEntity(MessageError.PASSWORD_INCORRECT);
    }
}
