export const requireAuth = (req, _res, next) => {
    if (req.session && req.session.user && req.session.user.trim() !== '') {
        next();
    } else {
        next(new Error('User must be logged in!'));
    }
};