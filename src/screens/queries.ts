import gql from 'graphql-tag';

export const QUERY_BON = gql`
    query GetBon ($id:uuid!) {
        bons(where: {id: {_eq: $id}}) {
            id
            image
            name
            text
            updated_at
            used
        }
    }
`;

export const QUERY_USED_BON = gql`
    query GetUsedBon {
            bons(where: {used: {_eq: true}}) {
            id
            name
            updated_at
        }
    }
`;

export const QUERY_ALL_BONS = gql`
    query GetAllBons {
            bons {
            id
            name
            used
        }
    }
`;