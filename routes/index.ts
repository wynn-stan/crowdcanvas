const routes = {
  home: {
    index: "/home",
    posts: {
      detail: "/home/post/[id]",
      create: "/create",
      edit: "/edit/[id]",
    },
  },
  events: {
    index: "/events/explore",
    detail: "/events/explore/[id]",
    create: "/events/create",
    edit: "/events/edit/[id]",
  },
};

export default routes;
