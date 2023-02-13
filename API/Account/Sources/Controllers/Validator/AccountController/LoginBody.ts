import { registerDecorator, ValidationOptions } from 'class-validator';

interface EmailOrUsername {
    email?: string;
    username?: string;
}

function HasEmailOrUsername(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'HasEmailOrUsername',
            target: object.constructor,
            propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: unknown): boolean {
                    if (typeof value !== 'object')
                        return false;
                    const object = value as EmailOrUsername;
                    return !!((object.email) || (object.username));
                },
            },
        });
    };
}


export class LoginBody {
    @HasEmailOrUsername({
        message: 'You must provide an email or a username',
    })
    public usernameOrEmail: EmailOrUsername;

    public password: string;

    public constructor(body: {
        username?: string,
        email?: string,
        password: string,
    }) {
        this.usernameOrEmail = {
            username: body.username,
            email: body.email,
        };
        this.password = body.password;
    }
}
