import { gql } from "apollo-server";

export const typeDefs = gql`
  type Roles {
    id: Int!
    name: String
    permissions: [String]
  }
  type user {
    id: Int!
    firstName: String
    lastName: String
    email: String
    isConfigAdmin: Boolean
    enabled: Boolean
    roles: [String]
  }
  input userObj {
    id: Int!
    firstName: String
    lastName: String
    email: String
    title: String
    isConfigAdmin: Boolean
    enabled: Boolean
    roles: [String]
  }
  type userData {
    totalusers: Int!
    users: [user]
  }
  # the schema allows the following query:
  type Query {
    getUsers(startUserNum: Int!, endUserNum: Int!): userData
    getUser(userId: Int!): user
    getRoles: [Roles]
  }
  type Mutation {
    addUser(user: userObj!): Boolean
    updateUser(id: Int!, user: userObj): Boolean
    deleteUser(id: Int!): Boolean
  }
`;
export default typeDefs;
