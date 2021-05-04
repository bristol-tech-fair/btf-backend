import postRouter from './post/post.router';
import competitionRouter from './competition/competition.router';
import groupRouter from './group/group.router';
import learningResourceRouter from './learningResource/learningResource.router';
import clubRouter from './club/club.router';

const routes = [
  postRouter,
  competitionRouter,
  groupRouter,
  learningResourceRouter,
  clubRouter
];

export default routes;
