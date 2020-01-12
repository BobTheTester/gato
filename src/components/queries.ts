import gql from 'graphql-tag';

export const MUTATION_USED = gql`
    mutation markAsUsed ($id:uuid!) {
        update_bons(where: {id: {_eq: $id}}, _set: {used: true}) {
            returning {
            used
            }
        }
    }
`;