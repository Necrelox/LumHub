import {
    MinLength,
    IsEmail,
    IsStrongPassword,
    MaxLength,
    IsAlphanumeric, IsOptional
} from 'class-validator';

import { MessageError } from '@/Errors/ErrorEntity';
import mailBlacklist from './mailBlacklist.json';

export class RegisterBody {
    @MinLength(4, {
        always: true,
        message: MessageError.USERNAME_LENGTH
    })
    @MaxLength(20, {
        always: true,
        message: MessageError.USERNAME_LENGTH
    })
    @IsAlphanumeric(undefined, {
        always: true,
        message: MessageError.USERNAME_ALPHANUMERIC
    })
    public username: string;

    @IsEmail({
        domain_specific_validation: true,
        host_blacklist: mailBlacklist,
    }, {
        always: true,
        message: MessageError.EMAIL_VALID
    })
    public email: string;

    @MaxLength(32, {
        always: true,
        message: MessageError.PASSWORD_LENGTH
    })
    @MinLength(6, {
        always: true,
        message: MessageError.PASSWORD_LENGTH
    })
    @IsStrongPassword(
        {
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0
        }
        , {
            always: true,
            message: MessageError.PASSWORD_STRENGTH
        })
    public password: string;

    @MaxLength(45, {
        always: true,
        message: MessageError.FIRSTNAME_LENGTH
    })
    @IsOptional()
    public firstName: string | undefined;

    @MaxLength(45, {
        always: true,
        message: MessageError.LASTNAME_LENGTH
    })
    @IsOptional()
    public lastName: string | undefined;

    @MaxLength(45, {
        always: true,
        message: MessageError.PHONENUMBER_LENGTH
    })
    @IsOptional()
    public phoneNumber: string | undefined;

    @MaxLength(45, {
        always: true,
        message: MessageError.COUNTRY_LENGTH
    })
    @IsOptional()
    public country: string | undefined;

    @MaxLength(45, {
        always: true,
        message: MessageError.POSTALCODE_LENGTH
    })
    @IsOptional()
    public postalCode: string | undefined;

    @MaxLength(45, {
        always: true,
        message: MessageError.CITY_LENGTH
    })
    @IsOptional()
    public city: string | undefined;

    @MaxLength(45, {
        always: true,
        message: MessageError.ADDRESS_LENGTH
    })
    @IsOptional()
    public address: string | undefined;

    public constructor(body: {
        username: string,
        email: string,
        password: string,
        firstName?: string,
        lastName?: string,
        phoneNumber?: string,
        country?: string
        postalCode?: string,
        city?: string,
        address?: string,
    }) {
        this.username = body.username;
        this.email = body.email;
        this.password = body.password;
        this.firstName = body.firstName;
        this.lastName = body.lastName;
        this.phoneNumber = body.phoneNumber;
        this.country = body.country;
        this.postalCode = body.postalCode;
        this.city = body.city;
        this.address = body.address;
    }
}
