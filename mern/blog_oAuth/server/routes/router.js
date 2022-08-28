
import express from 'express';
import passport from 'passport';
import { userLogout, userLogin, loginFailed, userUpdatePassword, gmailLogin } from "../controller/user-controller.js";

const router = express.Router();

router.get('/login/sucess', userLogin);
router.get('/login/failed', loginFailed);
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
router.get('/google/callback', passport.authenticate('google', { successRedirect: 'http://localhost:3000/', failureRedirect: 'http://localhost:3000' }),);
router.get('/logout', userLogout);

router.post('/updatePassword', userUpdatePassword)
router.post('/gmailLogin', gmailLogin)

export default router;

