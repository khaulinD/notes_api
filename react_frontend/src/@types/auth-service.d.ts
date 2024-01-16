export interface AuthServiceProps {
    login: (username: string, password: string) => any;
    isLoggedIn: boolean;
    logout: () => void;
    getUserInfo: (user_id:number) =>any;
    // refreshAccessToken: () => Promise<void>
    register: (username: string, password: string, email:string, firstName:string, secondName:string) => Promise<any>;
    check_email_verify: (user_id: string)=> Promise<any>;
}