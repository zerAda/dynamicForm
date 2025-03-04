'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/tests/add',
      handler: 'test.addRecord',
      config: { auth: false },
    },
    {
      method: 'PUT',
      path: '/tests/:id/activate',
      handler: 'test.activateRecord',
      config: { auth: false },
    },
    {
      method: 'PUT',
      path: '/tests/:id/deactivate',
      handler: 'test.deactivateRecord',
      config: { auth: false },
    },
  ],
};
