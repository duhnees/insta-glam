
import axios from 'axios';

export const useInteractWithPost = () => {
    const interactPost = async (_id: string, liked: boolean, commented: boolean) => {
        try {
            const response = await axios.post('/post/interact', {
                postId: _id,
                liked: liked,
                commented: commented,
            });
            return response.status;
        } catch (error) {
            // eslint-disable-next-line no-alert
            alert(error.response.data.message);
            return 500;
        }
    };

    return interactPost;
};