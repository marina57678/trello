import HTTPService from './HTTPService';
import UserStorage from '../utils/UserStorage.js'

class StatusRequest {
    async loadStatuses() {
        const statuses = await HTTPService.request({
            path: `/statuses`,
            userToken: UserStorage.token,
        });

        return statuses;
    }
}

export default new StatusRequest();