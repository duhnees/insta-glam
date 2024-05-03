
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

    const leaveComment = async (_id: string, comment: string, parent?: string) => {
        try {
            const response = await axios.post('/comment/add', {
                postId: _id,
                comment: comment,
                parent: parent
            });
            return response.status;
        } catch (error) {
            // eslint-disable-next-line no-alert
            alert(error.response.data.message);
            return 500;
        }
    }

    const makeNewPost = async (caption: string, outfitData: unknown, draft: boolean) => {
        const { hat, hair, face, top, pants, shoes, accessory1, accessory2 } = outfitData as {
            hat: number | undefined;
            hair: number | undefined;
            face: number;
            top: number;
            pants: number;
            shoes: number | undefined;
            accessory1: number | undefined;
            accessory2: number | undefined;
        };

        try {
            const response = await axios.post('/post/add', {
                draft: draft,
                caption: caption,
                hat: hat,
                hair: hair,
                face: face,
                top: top,
                pants: pants,
                shoes: shoes,
                accessory1: accessory1,
                accessory2: accessory2,
            });
            return response.status;
        } catch (error) {
            // eslint-disable-next-line no-alert
            alert(error.response.data.message);
            return 500;
        }
    }

    const saveDraft = async (postId: string, caption: string, outfitData: unknown, draft: boolean) => {
        const { hat, hair, face, top, pants, shoes, accessory1, accessory2 } = outfitData as {
            hat: number | undefined;
            hair: number | undefined;
            face: number;
            top: number;
            pants: number;
            shoes: number | undefined;
            accessory1: number | undefined;
            accessory2: number | undefined;
        };

        try {
            const response = await axios.post('/post/edit', {
                postId: postId,
                draft: draft,
                caption: caption,
                hat: hat,
                hair: hair,
                face: face,
                top: top,
                pants: pants,
                shoes: shoes,
                accessory1: accessory1,
                accessory2: accessory2,
            });
            return response.status;
        } catch (error) {
            // eslint-disable-next-line no-alert
            alert(error.response.data.message);
            return 500;
        }
    }

    const sendNotif = async (receiver: string, type: string, postId?: string, commentId?: string) => {
        try {
            const response = await axios.post('/notif/add', {
                receiver: receiver,
                postId: postId,
                commentId: commentId,
                type: type
            });
            return response.status;
        } catch (error) {
            // eslint-disable-next-line no-alert
            alert(error.response.data.message);
            return 500;
        }
    }
    return {interactPost, leaveComment, makeNewPost, saveDraft, sendNotif};
};