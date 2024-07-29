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
    getusers(startuserNum: Int!, enduserNum: Int!): userData
    getuser(userId: Int!): user
    getRoles: [Roles]
  }
  type Mutation {
    adduser(user: userObj!): Boolean
    updateuser(id: Int!, user: userObj): Boolean
    deleteuser(id: Int!): Boolean
  }
`;
export default typeDefs;
