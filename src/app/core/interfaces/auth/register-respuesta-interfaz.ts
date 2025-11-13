import { Users } from "../users/auth/users";

export interface RegisterRespuestaInterfaz {
    token: string;
    user:Users;
    message?: string;
    error?: string;
}
