export interface AuthServiceProps {
    login: (username: string, password: string) => any;
    isLoggedIn: boolean;
    logout: () => void;
    getUserInfo: (user_id:number) =>any;
    // refreshAccessToken: () => Promise<void>
    register: (username: File | string, password: File | string, email: File | string, firstName: File | string, secondName: File | string) => Promise<any>;
    check_email_verify: (user_id: string)=> Promise<any>;
}