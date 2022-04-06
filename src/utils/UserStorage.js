class UserStorage {
    #userToken;
    #userName;

    constructor() {
        this.#initialSetup();
    }

    get token() {
        return this.#userToken;
    }
    get name() {
        return this.#userName;
    }

    #initialSetup() {
        const userStorage = localStorage.getItem("user");

        if(!!userStorage) {
            const user = JSON.parse(userStorage);

            this.#userToken = user.userToken;
            this.#userName = user.userName;
        }
        else {
            this.#userToken = '';
            this.#userName = '';
        }
    }

    setUser(userToken, userName){
        this.#userToken = userToken;
        this.#userName = userName;
        
        const user = {
            userToken, 
            userName
        }

        localStorage.setItem("user", JSON.stringify(user));
    }

    hasToken() {
        return !!this.#userToken;
    }

    removeUser() {
        localStorage.removeItem("user");
        
        this.#userToken = '';
        this.#userName = '';
    }
}

export default new UserStorage();