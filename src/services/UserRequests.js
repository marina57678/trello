import HTTPService from './HTTPService';

class UserRequests {
    async registration(username, email, password) {
        const data = {
            username,
            email,
            password,
        };

        const newUser = await HTTPService.request({
            method: 'POST',
            path: `/auth/local/register`,
            data,
        });

        return newUser;
    }

    async login(username, password) {
        const data = {
            identifier: username,
            password: password,
        };

        const user = await HTTPService.request({
            method: 'POST',
            path: `/auth/local`,
            data,
        });

        return user;
    }
}

export default new UserRequests();