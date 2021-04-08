import postRouter from './post/post.router';
import competitionRouter from './competition/competition.router';
import groupRouter from './group/group.router';
import learningResourceRouter from './learningResource/learningResource.router';

const routes = [
  postRouter,
  competitionRouter,
  groupRouter,
  learningResourceRouter
];

export default routes;
