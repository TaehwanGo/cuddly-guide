import multer from "multer";
import routes from "./routes";

const multerVideo = multer({dest: 'uploads/videos/'}); // dest : destination

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "Wetube";
    res.locals.routes = routes;
    res.locals.loggedUser = req.user || null; // 이렇게 해야 우리 template들이 이 user에 접근 가능함 // login 상태가 아니라면 empty object 전달
    // console.log(req.user); // {} 로 나오는 중  // app.js에 app.use(passport.session()); 에 오타 있었음(passport빼먹음)
    next(); //- 미들웨어가 next에 req를 전달해야 함, 이 경우 미들웨어가 커넥션과 라우트들 사이에 있으므로 next()를 반드시 추가
};

export const onlyPublic = (req, res, next) => {
    if(req.user){
        res.redirect(routes.home);
    } else {
        next();
    }
}

export const onlyPrivate = (req, res, next) => {
    if(req.user){
        next();
    } else {
        res.redirect(routes.home);
    }
}

export const uploadVideo = multerVideo.single("videoFile"); // single.("videoFile") : 하나의 파일만 업로드 가능하고
// upload.pug에서 post로 전달되는 video file의 name의 key는 videoFile 이다.