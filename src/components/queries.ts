import gql from 'graphql-tag';

export const MUTATION_USED = gql`
    mutation markAsUsed ($id:uuid!, $used:Boolean!) {
        update_bons(where: {id: {_eq: $id}}, _set: {used: $used}) {
            returning {
            used
            }
        }
    }
`;