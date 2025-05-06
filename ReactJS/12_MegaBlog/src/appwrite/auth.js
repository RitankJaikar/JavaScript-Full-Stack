import config from "../config/config";
import { Client, Account, ID } from "appwrite";

// const client = new Client()
//     .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
//     .setProject('<PROJECT_ID>'); // Your project ID
// const account = new Account(client);

//using class to avoid/prevent vendor lock-in
export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl) // Your API Endpoint
            .setProject(config.projectId); // Your project ID
        this.account = new Account(this.client);
    }

    //signup
    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount) {
                //call another method
                await this.login({email, password});
            }
            else {
                console.log("AuthService :: createAccount :: error ::", "Failed to create account.");
            }
            return userAccount;
        }
        catch (err) {
            console.log("AuthService :: createAccount :: error ::", "Failed to create account.", err);
            throw err;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);  //changed
        }
        catch (err) {
            console.log("AuthService :: login :: error ::", err);
            throw err;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        }
        catch (err) {
            console.log("Appwrite service :: getCurrentUser :: error :: ", err);
        }

        return null;
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        }
        catch (err) {
            console.log("Appwrite service :: logout :: error :: ", err);
        }

        return null;
    }
}

const authService = new AuthService();

export default authService;