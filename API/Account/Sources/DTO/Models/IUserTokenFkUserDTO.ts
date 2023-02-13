export interface IUserTokenFkUserDTO {
    token: string;
    publicKey: string;
    userUuid: string;
    username: string;
    email: string;
    password: Buffer;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    country: string;
    postalCode: string;
    city: string;
    address: string;
    coins: number;
    activityMessage: string;
    isConnected: boolean;
    isBlackListed: boolean;
    createdAt: Date;
    updatedAt: Date;
    uuid: string;
}
