import { LinkType } from '@/components/LinkComponent'

export const getUserLinks = async (username: string): Promise<LinkType[]> => {
    try {
        const BASE_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL
        if(!BASE_URL) {
            throw new Error('Missing NEXT_PUBLIC_NEXTAUTH_URL environment variable')
        }
        const res = await fetch(`${BASE_URL}/api/linkuser/?username=${encodeURIComponent(username)}`, {
            method: 'GET',
        })

        if(!res.ok) {
            throw new Error('Error fetching user links')
        }
        return await res.json()
    } catch (error) {
        console.error('Error fetching user links:', error)
        return []
    }
}
