export enum MessageError {
    USERNAME_LENGTH = 'Username must be between 4 and 20 characters',
    USERNAME_ALPHANUMERIC = 'Username must be alphanumeric',
    EMAIL_VALID = 'Email must be valid (Email temporary unavailable)',
    PASSWORD_LENGTH = 'Password must be superior to 6 characters and inferior to 32 characters',
    PASSWORD_STRENGTH = 'Password must contain at least one uppercase, one lowercase and one number',
    FIRSTNAME_LENGTH = 'Firstname must be inferior to 45 characters',
    LASTNAME_LENGTH = 'Lastname must be inferior to 45 characters',
    PHONENUMBER_LENGTH = 'Phone number must be inferior to 45 characters',
    ADDRESS_LENGTH = 'Address must be inferior to 255 characters',
    CITY_LENGTH = 'City must be inferior to 45 characters',
    POSTALCODE_LENGTH = 'Postal code must be inferior to 45 characters',
    COUNTRY_LENGTH = 'Country must be inferior to 45 characters',
    PASSWORD_INCORRECT = 'The password used is incorrect',

    // database error maybe can later be separated into several error entities depending on the layer
    SERVER_DATABASE_ERROR = 'Database error',
    MODEL_NOT_CREATED = 'Model not created',
    MODEL_NOT_UPDATED = 'Model not updated',
    MODEL_NOT_DELETED = 'Model not deleted',
    MODEL_NOT_FOUND = 'Model not found',
}

export class ErrorEntity extends Error {
    private readonly code: number;
    private readonly MessageAndCode: { [p: string]: number } = {
        [MessageError.USERNAME_LENGTH]: 400,
        [MessageError.USERNAME_ALPHANUMERIC]: 400,
        [MessageError.EMAIL_VALID]: 400,
        [MessageError.PASSWORD_LENGTH]: 400,
        [MessageError.PASSWORD_STRENGTH]: 400,
        [MessageError.FIRSTNAME_LENGTH]: 400,
        [MessageError.LASTNAME_LENGTH]: 400,
        [MessageError.PHONENUMBER_LENGTH]: 400,
        [MessageError.ADDRESS_LENGTH]: 400,
        [MessageError.CITY_LENGTH]: 400,
        [MessageError.POSTALCODE_LENGTH]: 400,
        [MessageError.COUNTRY_LENGTH]: 400,
        [MessageError.PASSWORD_INCORRECT]: 400,
        [MessageError.SERVER_DATABASE_ERROR]: 500,
        [MessageError.MODEL_NOT_CREATED]: 500,
        [MessageError.MODEL_NOT_UPDATED]: 500,
        [MessageError.MODEL_NOT_DELETED]: 500,
        [MessageError.MODEL_NOT_FOUND]: 404,
    };

    constructor(message: MessageError, detail?: string) {
        super(message);
        this.code = <number>this.MessageAndCode[message];
        if (detail)
            this.message = `${this.message} : ${detail}`;

    }

    public getCode(): number {
        return this.code;
    }

    public getMessage(): string {
        return this.message;
    }
}
