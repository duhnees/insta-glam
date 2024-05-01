
import axios from 'axios';

export const useUserInteractions = () => {

    const getUserInfo = async (username: string) => {
        try {
            const response = await axios.post('/account/getUser', {
                username: username,
            });
            return response.data;
        } catch (error) {
            // eslint-disable-next-line no-alert
            alert(error.response.data.message);
            return 500;
        }
    };

    const follow = async (follower: string, following: string) => {
        try {
            const response = await axios.post('/account/follow', {
                follower: follower,
                following: following,
            });
            return response.status;
        } catch (error) {
            // eslint-disable-next-line no-alert
            alert(error.response.data.message);
            return 500;
        }
    };

    const unfollow = async (follower: string, following: string) => {
        try {
            const response = await axios.post('/account/unfollow', {
                follower: follower,
                following: following,
            });
            return response.status;
        } catch (error) {
            // eslint-disable-next-line no-alert
            alert(error.response.data.message);
            return 500;
        }
    };

    const editBio = async (bio: string) => {
        try {
            const response = await axios.post('/account/edit', {
                bio: bio,
            });
            return response.data;
        } catch (error) {
            // eslint-disable-next-line no-alert
            alert(error.response.data.message);
            return 500;
        }
    };

    return {getUserInfo, follow, unfollow, editBio};
};