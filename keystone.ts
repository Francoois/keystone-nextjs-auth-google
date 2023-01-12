// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config

import { config } from '@keystone-6/core';

// to keep this file tidy, we define our schema in a different file
import { lists } from './schema';

// authentication is configured separately here too, but you might move this elsewhere
// when you write your list-level access control functions, as they typically rely on session data
import { withAuth, session } from './auth';

export default withAuth(
  config({
    db: {
        provider: 'sqlite',
      url: 'file:./keystone.db',
    },
    lists,
    session,
	// ui: {
	// 	async isAccessAllowed(context) {
	// 		// let pass = 0;
	// 		console.log("\nSESSION: ", context.session );
	// 		console.log("SESSION STRATEGY : ", context.sessionStrategy );
	// 		console.log("SESSION STRATEGY GET : ", await context.sessionStrategy?.get({context}) );
	// 		console.log("CONTEXT REQ URL : ", context.req?.url );

	// 		// return context.session?.data?.role === "ADMIN";
	// 		return false;
	// 	},
	// 	pageMiddleware({context, isValidSession}) {
	// 		console.log("PAGE MIDDLEWARE");
	// 	},
	// }
  })
);
