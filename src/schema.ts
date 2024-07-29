import { gql } from "apollo-server";

export const typeDefs = gql`
  type Roles {
    id: Int!
    name: String
    permissions: [String]
  }
  type User {
    id: Int!
    firstName: String
    lastName: String
    email: String
    isConfigAdmin: Boolean
    enabled: Boolean
    roles: [String]
  }
  input UserObj {
    id: Int!
    firstName: String
    lastName: String
    email: String
    title: String
    isConfigAdmin: Boolean
    enabled: Boolean
    roles: [String]
  }
  type UserData {
    totalUsers: Int!
    users: [User]
  }
  # the schema allows the following query:
  type Query {
    getUsers(startUserNum: Int!, endUserNum: Int!): UserData
    getUser(userId: Int!): User
    getRoles: [Roles]
  }
  type Mutation {
    addUser(user: UserObj): Boolean
    updateUser(id: Int!, user: UserObj): Boolean
    deleteUser(id: Int!): Boolean
  }
`;
export default typeDefs;
