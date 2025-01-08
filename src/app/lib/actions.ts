'use server'

import { cookies } from "next/headers"
import jwt, {JwtPayload} from 'jsonwebtoken';


export async function handleLogin(userId: string, accessToken: string, refreshToken: string) {
    const cookieStore = await cookies()
    cookieStore.set('session_userid', userId, {
        httpOnly: true,
        secure: false, // Make sure to set to true in production with HTTPS
        maxAge: 60 * 60 * 24, // One day (24 hours)
        path: '/',
        sameSite: 'lax',  // Or 'Strict' or 'None' depending on your needs
    })

    cookieStore.set('session_access_token', accessToken, {
        httpOnly: true,
        secure: false, // Make sure to set to true in production with HTTPS
        maxAge: 60 * 60, // 60 minutes (1 hour)
        path: '/',
        sameSite: 'lax',  // Or 'Strict' or 'None' depending on your needs
    })

    cookieStore.set('session_refresh_token', refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 24,
        path: '/',
        sameSite: 'lax',
    })
}

export async function resetCookies() {
    const cookieStore = await cookies()
    cookieStore.set('session_userid', '', {maxAge: 0, path: '/'})
    cookieStore.set('session_access_token', '', {maxAge: 0, path: '/'})
    cookieStore.set('session_refresh_token', '', {maxAge: 0, path: '/'})
}

export async function getUserId() {
    const cookieStore = await cookies(); // Await cookies() call
    const userId = cookieStore.get('session_userid')?.value; // Access the cookie value
    console.log("getUserId fetched:", userId); // Debug log
    return userId ? userId : null;
}



export async function getRefreshToken() {
    const cookieStore = await cookies()
    const tokenRefresh = cookieStore.get('session_refresh_token')?.value
    return tokenRefresh ? tokenRefresh : null
}

export async function getAccessToken(): Promise<string | undefined> {
    const cookieStore = await cookies()
    let tokenAccess = cookieStore.get('session_access_token')?.value
    if (!tokenAccess) {
        const refreshToken = await getRefreshToken()
        if (!refreshToken){
            console.log('No refresh token available. Cannot refresh expired access token.')
            return undefined
        }
        tokenAccess = await handleRefresh()

    }
    if (tokenAccess && await isTokenExpired(tokenAccess)){
        console.log('Access token expired, refreshing...');
        tokenAccess = await handleRefresh()
    }
    return tokenAccess
}


export async function isTokenExpired(token: string): Promise<boolean> {
    try {
        const decoded = jwt.decode(token) as JwtPayload | null // Use jwtDecode instead of jwt.decode
        const now = Math.floor(Date.now() / 1000);
        
        // Ensure that the decoded token exists and has the 'exp' field
        return decoded ? decoded.exp ? decoded.exp < now : false : false;
    } catch (error) {
        console.error('Error decoding token:', error)
        return false
    }
}


export async function handleRefresh(): Promise<string | undefined> {
    const cookieStore = await cookies();
    const refreshToken = await getRefreshToken();

    if (!refreshToken) {
        await resetCookies(); // Ensure cookies are reset
        return undefined;
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/user/accounts/token/refresh/`, {
            method: 'POST',
            body: JSON.stringify({ refresh: refreshToken }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json', // Fixed typo
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to refresh token: ${response.status} ${response.statusText}`);
        }
        const data = await response.json()

        if (data.access) {
            cookieStore.set('session_access_token', data.access, {
                httpOnly: true,
                secure: false,
                maxAge: 60*60,
                path: '/',
                sameSite: 'lax'
            })
            return data.access
        } else {
            throw new Error('Refresh token response does not contain access token');
        }
    } catch (error) {
        console.error('Error refreshing token:', error);
        await resetCookies();
        return undefined;
    }

}