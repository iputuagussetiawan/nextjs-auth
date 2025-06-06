
/**
 * An array of routes that are accessible without authentication
 * These route does not need to be protected by middleware / do not require authentication
 */
export const publicRoutes=[
    '/',
    '/auth/new-verification'
]

export const authRoutes=[
    '/auth/login',
    '/auth/register',
    '/auth/error',
    '/auth/reset',
    '/auth/new-password'
]


export const apiAuthPrefix='/api/auth'

/**
 * Default login redirect after login
 * @default '/settings'
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT='/settings'