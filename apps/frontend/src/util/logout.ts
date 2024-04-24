
import axios from 'axios';

export const useLogout = () => {
    const logout = async () => {
        try {
            const response = await axios.post('/api/account/logout');
            return response.status;
        } catch (error) {
            // eslint-disable-next-line no-alert
            alert(error.response.data.message);
            return 500;
        }
    };

    return logout;
};