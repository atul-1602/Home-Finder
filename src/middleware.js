import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  publicRoutes: [
    '/',
    '/pricing',
    '/findhome',
    '/about',
    '/contact',
    '/api/public(.*)',
    '/property/(.*)',
    '/sign-in',
    '/sign-up'
  ],
  ignoredRoutes: [
    '/api/webhook(.*)',
    '/_next/(.*)',
    '/favicon.ico'
  ]
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}; 