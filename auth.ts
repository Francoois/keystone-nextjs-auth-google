import { createAuth } from '@opensaas/keystone-nextjs-auth';
import GoogleProvider from '@opensaas/keystone-nextjs-auth/providers/google';

// Welcome to some authentication for Keystone
//
// This is using @keystone-6/auth to add the following
// - A sign-in page for your Admin UI
// - A cookie-based stateless session strategy
//    - Using a User email as the identifier
//    - 30 day cookie expiration
//
// This file does not configure what Users can do, and the default for this starter
// project is to allow anyone - logged-in or not - to do anything.
//
// If you want to prevent random people on the internet from accessing your data,
// you can find out how by reading https://keystonejs.com/docs/guides/auth-and-access-control
//
// If you want to learn more about how our out-of-the-box authentication works, please
// read https://keystonejs.com/docs/apis/auth#authentication-api

// see https://keystonejs.com/docs/apis/session for the session docs
import { statelessSessions } from '@keystone-6/core/session';

let sessionSecret = process.env.SESSION_SECRET as string;
console.log("SESSION SECRET : ", sessionSecret);

// withAuth is a function we can use to wrap our base configuration
const { withAuth } = createAuth({
	listKey: 'User',
	identityField: 'email',
	sessionData: 'name email',
	sessionSecret,
	autoCreate: true,
	resolver: async ({ user, profile, account }) => {
		const name = user.name as string;
		const email = user.email as string;
		return { email, name };
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		})
	]
});

const sessionMaxAge = 60 * 60 * 24 * 30;
// you can find out more at https://keystonejs.com/docs/apis/session#session-api
const session = statelessSessions({
	maxAge: sessionMaxAge,
	secret: sessionSecret!,
});

export { withAuth, session };
