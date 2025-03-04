import ZFormsButton from "./components/ZFormsButton";

export default {
  register(app) {
    app.registerPlugin({
      id: "zforms",
      name: "ZForms",
    });

    app.injectContentManagerComponent("editView", "actions", {
      name: "ZFormsButton",
      Component: ZFormsButton,
    });
  },
};
