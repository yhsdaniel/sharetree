const BASE_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL

export const getUserLinks = async (username: string) => {
    try {
        if(!BASE_URL) {
            throw new Error('Missing NEXT_PUBLIC_NEXTAUTH_URL environment variable')
        }
        const res = await fetch(`${BASE_URL}/api/linkuser?username=${username}`, {
            method: 'GET',
            cache: 'no-store'
        })

        if(!res.ok) {
            throw new Error('Error fetching user links')
        }
        const data = await res.json()
        return data
    } catch (error) {
        console.error('Error fetching user links:', error)
        return []
    }
}

export const getLinks = async (userId: string) => {
    try {
        if(!BASE_URL) {
            throw new Error('Missing NEXT_PUBLIC_NEXTAUTH_URL environment variable')
        }
        const response = await fetch(`${BASE_URL}/api/linkadmin?id=${userId}`, {
            method: 'GET',
            cache: 'no-store'
        })
        return response.json()
    } catch (error) {
        console.error('Error fetching user links:', error)
        return []
    }
}