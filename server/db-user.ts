

export interface DbUser {
    id:number;
    email:string;
    passwordDigest:string,
    roles: string[]
}