import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  uuid: any,
  timestamptz: any,
};

export type Bons = {
   __typename?: 'bons',
  id: Scalars['uuid'],
  image?: Maybe<Scalars['String']>,
  name: Scalars['String'],
  text: Scalars['String'],
  updated_at?: Maybe<Scalars['timestamptz']>,
  used: Scalars['Boolean'],
};

export type Bons_Aggregate = {
   __typename?: 'bons_aggregate',
  aggregate?: Maybe<Bons_Aggregate_Fields>,
  nodes: Array<Bons>,
};

export type Bons_Aggregate_Fields = {
   __typename?: 'bons_aggregate_fields',
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<Bons_Max_Fields>,
  min?: Maybe<Bons_Min_Fields>,
};


export type Bons_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Bons_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

export type Bons_Aggregate_Order_By = {
  count?: Maybe<Order_By>,
  max?: Maybe<Bons_Max_Order_By>,
  min?: Maybe<Bons_Min_Order_By>,
};

export type Bons_Arr_Rel_Insert_Input = {
  data: Array<Bons_Insert_Input>,
  on_conflict?: Maybe<Bons_On_Conflict>,
};

export type Bons_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Bons_Bool_Exp>>>,
  _not?: Maybe<Bons_Bool_Exp>,
  _or?: Maybe<Array<Maybe<Bons_Bool_Exp>>>,
  id?: Maybe<Uuid_Comparison_Exp>,
  image?: Maybe<String_Comparison_Exp>,
  name?: Maybe<String_Comparison_Exp>,
  text?: Maybe<String_Comparison_Exp>,
  updated_at?: Maybe<Timestamptz_Comparison_Exp>,
  used?: Maybe<Boolean_Comparison_Exp>,
};

export enum Bons_Constraint {
  BonsId2Key = 'bons_id2_key',
  BonsPkey = 'bons_pkey'
}

export type Bons_Insert_Input = {
  id?: Maybe<Scalars['uuid']>,
  image?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  text?: Maybe<Scalars['String']>,
  updated_at?: Maybe<Scalars['timestamptz']>,
  used?: Maybe<Scalars['Boolean']>,
};

export type Bons_Max_Fields = {
   __typename?: 'bons_max_fields',
  image?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  text?: Maybe<Scalars['String']>,
  updated_at?: Maybe<Scalars['timestamptz']>,
};

export type Bons_Max_Order_By = {
  image?: Maybe<Order_By>,
  name?: Maybe<Order_By>,
  text?: Maybe<Order_By>,
  updated_at?: Maybe<Order_By>,
};

export type Bons_Min_Fields = {
   __typename?: 'bons_min_fields',
  image?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  text?: Maybe<Scalars['String']>,
  updated_at?: Maybe<Scalars['timestamptz']>,
};

export type Bons_Min_Order_By = {
  image?: Maybe<Order_By>,
  name?: Maybe<Order_By>,
  text?: Maybe<Order_By>,
  updated_at?: Maybe<Order_By>,
};

export type Bons_Mutation_Response = {
   __typename?: 'bons_mutation_response',
  affected_rows: Scalars['Int'],
  returning: Array<Bons>,
};

export type Bons_Obj_Rel_Insert_Input = {
  data: Bons_Insert_Input,
  on_conflict?: Maybe<Bons_On_Conflict>,
};

export type Bons_On_Conflict = {
  constraint: Bons_Constraint,
  update_columns: Array<Bons_Update_Column>,
  where?: Maybe<Bons_Bool_Exp>,
};

export type Bons_Order_By = {
  id?: Maybe<Order_By>,
  image?: Maybe<Order_By>,
  name?: Maybe<Order_By>,
  text?: Maybe<Order_By>,
  updated_at?: Maybe<Order_By>,
  used?: Maybe<Order_By>,
};

export enum Bons_Select_Column {
  Id = 'id',
  Image = 'image',
  Name = 'name',
  Text = 'text',
  UpdatedAt = 'updated_at',
  Used = 'used'
}

export type Bons_Set_Input = {
  id?: Maybe<Scalars['uuid']>,
  image?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  text?: Maybe<Scalars['String']>,
  updated_at?: Maybe<Scalars['timestamptz']>,
  used?: Maybe<Scalars['Boolean']>,
};

export enum Bons_Update_Column {
  Id = 'id',
  Image = 'image',
  Name = 'name',
  Text = 'text',
  UpdatedAt = 'updated_at',
  Used = 'used'
}

export type Boolean_Comparison_Exp = {
  _eq?: Maybe<Scalars['Boolean']>,
  _gt?: Maybe<Scalars['Boolean']>,
  _gte?: Maybe<Scalars['Boolean']>,
  _in?: Maybe<Array<Scalars['Boolean']>>,
  _is_null?: Maybe<Scalars['Boolean']>,
  _lt?: Maybe<Scalars['Boolean']>,
  _lte?: Maybe<Scalars['Boolean']>,
  _neq?: Maybe<Scalars['Boolean']>,
  _nin?: Maybe<Array<Scalars['Boolean']>>,
};

export type Mutation_Root = {
   __typename?: 'mutation_root',
  delete_bons?: Maybe<Bons_Mutation_Response>,
  insert_bons?: Maybe<Bons_Mutation_Response>,
  update_bons?: Maybe<Bons_Mutation_Response>,
};


export type Mutation_RootDelete_BonsArgs = {
  where: Bons_Bool_Exp
};


export type Mutation_RootInsert_BonsArgs = {
  objects: Array<Bons_Insert_Input>,
  on_conflict?: Maybe<Bons_On_Conflict>
};


export type Mutation_RootUpdate_BonsArgs = {
  _set?: Maybe<Bons_Set_Input>,
  where: Bons_Bool_Exp
};

export enum Order_By {
  Asc = 'asc',
  AscNullsFirst = 'asc_nulls_first',
  AscNullsLast = 'asc_nulls_last',
  Desc = 'desc',
  DescNullsFirst = 'desc_nulls_first',
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
   __typename?: 'query_root',
  bons: Array<Bons>,
  bons_aggregate: Bons_Aggregate,
  bons_by_pk?: Maybe<Bons>,
};


export type Query_RootBonsArgs = {
  distinct_on?: Maybe<Array<Bons_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Bons_Order_By>>,
  where?: Maybe<Bons_Bool_Exp>
};


export type Query_RootBons_AggregateArgs = {
  distinct_on?: Maybe<Array<Bons_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Bons_Order_By>>,
  where?: Maybe<Bons_Bool_Exp>
};


export type Query_RootBons_By_PkArgs = {
  id: Scalars['uuid']
};

export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>,
  _gt?: Maybe<Scalars['String']>,
  _gte?: Maybe<Scalars['String']>,
  _ilike?: Maybe<Scalars['String']>,
  _in?: Maybe<Array<Scalars['String']>>,
  _is_null?: Maybe<Scalars['Boolean']>,
  _like?: Maybe<Scalars['String']>,
  _lt?: Maybe<Scalars['String']>,
  _lte?: Maybe<Scalars['String']>,
  _neq?: Maybe<Scalars['String']>,
  _nilike?: Maybe<Scalars['String']>,
  _nin?: Maybe<Array<Scalars['String']>>,
  _nlike?: Maybe<Scalars['String']>,
  _nsimilar?: Maybe<Scalars['String']>,
  _similar?: Maybe<Scalars['String']>,
};

export type Subscription_Root = {
   __typename?: 'subscription_root',
  bons: Array<Bons>,
  bons_aggregate: Bons_Aggregate,
  bons_by_pk?: Maybe<Bons>,
};


export type Subscription_RootBonsArgs = {
  distinct_on?: Maybe<Array<Bons_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Bons_Order_By>>,
  where?: Maybe<Bons_Bool_Exp>
};


export type Subscription_RootBons_AggregateArgs = {
  distinct_on?: Maybe<Array<Bons_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Bons_Order_By>>,
  where?: Maybe<Bons_Bool_Exp>
};


export type Subscription_RootBons_By_PkArgs = {
  id: Scalars['uuid']
};


export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamptz']>,
  _gt?: Maybe<Scalars['timestamptz']>,
  _gte?: Maybe<Scalars['timestamptz']>,
  _in?: Maybe<Array<Scalars['timestamptz']>>,
  _is_null?: Maybe<Scalars['Boolean']>,
  _lt?: Maybe<Scalars['timestamptz']>,
  _lte?: Maybe<Scalars['timestamptz']>,
  _neq?: Maybe<Scalars['timestamptz']>,
  _nin?: Maybe<Array<Scalars['timestamptz']>>,
};


export type Uuid_Comparison_Exp = {
  _eq?: Maybe<Scalars['uuid']>,
  _gt?: Maybe<Scalars['uuid']>,
  _gte?: Maybe<Scalars['uuid']>,
  _in?: Maybe<Array<Scalars['uuid']>>,
  _is_null?: Maybe<Scalars['Boolean']>,
  _lt?: Maybe<Scalars['uuid']>,
  _lte?: Maybe<Scalars['uuid']>,
  _neq?: Maybe<Scalars['uuid']>,
  _nin?: Maybe<Array<Scalars['uuid']>>,
};

export type MarkAsUsedMutationVariables = {
  id: Scalars['uuid']
};


export type MarkAsUsedMutation = (
  { __typename?: 'mutation_root' }
  & { update_bons: Maybe<(
    { __typename?: 'bons_mutation_response' }
    & { returning: Array<(
      { __typename?: 'bons' }
      & Pick<Bons, 'used'>
    )> }
  )> }
);

export type GetBonQueryVariables = {
  id: Scalars['uuid']
};


export type GetBonQuery = (
  { __typename?: 'query_root' }
  & { bons: Array<(
    { __typename?: 'bons' }
    & Pick<Bons, 'id' | 'image' | 'name' | 'text' | 'updated_at' | 'used'>
  )> }
);

export type GetUsedBonQueryVariables = {};


export type GetUsedBonQuery = (
  { __typename?: 'query_root' }
  & { bons: Array<(
    { __typename?: 'bons' }
    & Pick<Bons, 'id' | 'name' | 'updated_at'>
  )> }
);


export const MarkAsUsedDocument = gql`
    mutation markAsUsed($id: uuid!) {
  update_bons(where: {id: {_eq: $id}}, _set: {used: true}) {
    returning {
      used
    }
  }
}
    `;
export type MarkAsUsedMutationFn = ApolloReactCommon.MutationFunction<MarkAsUsedMutation, MarkAsUsedMutationVariables>;

/**
 * __useMarkAsUsedMutation__
 *
 * To run a mutation, you first call `useMarkAsUsedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkAsUsedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markAsUsedMutation, { data, loading, error }] = useMarkAsUsedMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMarkAsUsedMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MarkAsUsedMutation, MarkAsUsedMutationVariables>) {
        return ApolloReactHooks.useMutation<MarkAsUsedMutation, MarkAsUsedMutationVariables>(MarkAsUsedDocument, baseOptions);
      }
export type MarkAsUsedMutationHookResult = ReturnType<typeof useMarkAsUsedMutation>;
export type MarkAsUsedMutationResult = ApolloReactCommon.MutationResult<MarkAsUsedMutation>;
export type MarkAsUsedMutationOptions = ApolloReactCommon.BaseMutationOptions<MarkAsUsedMutation, MarkAsUsedMutationVariables>;
export const GetBonDocument = gql`
    query GetBon($id: uuid!) {
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

/**
 * __useGetBonQuery__
 *
 * To run a query within a React component, call `useGetBonQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBonQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBonQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBonQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetBonQuery, GetBonQueryVariables>) {
        return ApolloReactHooks.useQuery<GetBonQuery, GetBonQueryVariables>(GetBonDocument, baseOptions);
      }
export function useGetBonLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetBonQuery, GetBonQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetBonQuery, GetBonQueryVariables>(GetBonDocument, baseOptions);
        }
export type GetBonQueryHookResult = ReturnType<typeof useGetBonQuery>;
export type GetBonLazyQueryHookResult = ReturnType<typeof useGetBonLazyQuery>;
export type GetBonQueryResult = ApolloReactCommon.QueryResult<GetBonQuery, GetBonQueryVariables>;
export const GetUsedBonDocument = gql`
    query GetUsedBon {
  bons(where: {used: {_eq: true}}) {
    id
    name
    updated_at
  }
}
    `;

/**
 * __useGetUsedBonQuery__
 *
 * To run a query within a React component, call `useGetUsedBonQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsedBonQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsedBonQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsedBonQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUsedBonQuery, GetUsedBonQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUsedBonQuery, GetUsedBonQueryVariables>(GetUsedBonDocument, baseOptions);
      }
export function useGetUsedBonLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUsedBonQuery, GetUsedBonQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUsedBonQuery, GetUsedBonQueryVariables>(GetUsedBonDocument, baseOptions);
        }
export type GetUsedBonQueryHookResult = ReturnType<typeof useGetUsedBonQuery>;
export type GetUsedBonLazyQueryHookResult = ReturnType<typeof useGetUsedBonLazyQuery>;
export type GetUsedBonQueryResult = ApolloReactCommon.QueryResult<GetUsedBonQuery, GetUsedBonQueryVariables>;