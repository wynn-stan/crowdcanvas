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
    index: "/events",
    detail: "/events/[id]",
    create: "/events/create",
    edit: "/events/edit/[id]",
  },
};

export default routes;
