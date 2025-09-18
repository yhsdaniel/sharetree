'use client'

import { GET_USER_QUERY } from "@/graphql/accessQuery";
import { useQuery } from "@apollo/client";

const useQueryAndMutation = (username: string) => {
    const { data } = useQuery(GET_USER_QUERY, {
        variables: { username },
        fetchPolicy: 'cache-and-network',
    })
    return { data }
}

export default useQueryAndMutation