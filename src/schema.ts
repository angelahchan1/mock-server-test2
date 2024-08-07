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
    username: String
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
    username: String
    isConfigAdmin: Boolean
    enabled: Boolean
    roles: [String]
  }
  input UserRequestInput {
    username: String!
    firstName: String!
    lastName: String!
    email: String!
    enabled: Boolean!
  }
  type Error {
    code: Int!
    message: String!
  }
  enum RequestType {
    ADD_USER
    UPDATE_USER
    ADD_ROLES
    REMOVE_ROLES
    DELETE_USER
  }
  type ChangeRequestResult {
    error: Error
    success: Boolean!
    requestType: RequestType
  }

  type UserAndRoles {
    totalUsers: Int!
    users: [User]
  }
  # the schema allows the following query:
  type Query {
    fetchAllUsers(begin: Int!, end: Int!): UserAndRoles
    getUser(userId: Int!): User
    getRoles: [Roles]
  }
  type Mutation {
    createUser(User: userObj!): Boolean
    updateUser(id: Int!, User: userObj): Boolean
    deleteUser(id: Int!): Boolean
  }
`;
export default typeDefs;
