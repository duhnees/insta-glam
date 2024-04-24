
import axios from 'axios';

export const useSignUpLogin = () => {
    const signupOrLogin = async (url: string, username: string, password: string) => {
        try {
            const response = await axios.post(url, {
                username: username,
                password: password
            });
            return response.status;
        } catch (error) {
            // eslint-disable-next-line no-alert
            alert(error.response.data.message);
            return 500;
        }
    };

    return signupOrLogin;
};