import users from "./users.json";

interface Role {
  id: number;
  name: string;
  permissions: string[];
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  isConfigAdmin: boolean;
  enabled: boolean;
  roles: string[];
}

interface UserObj {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  isConfigAdmin: boolean;
  enabled: boolean;
  roles: string[];
}

interface UserAndRoles {
  totalUsers: number;
  users: User[];
}

interface Users {
  users: UserAndRoles;
  roles: Role[]; // Adjust to match the structure if needed
}

const usersData: Users = users;

const resolvers = {
  Query: {
    fetchAllUsers: (
      _: any,
      {
        begin,
        end,
      }: {
        begin: number;
        end: number;
      }
    ) => {
      if (typeof begin !== "number" || typeof end !== "number") {
        throw new Error("Invalid arguments");
      }
      const usersInRange = usersData.users.users.slice(begin - 1, end);
      return {
        totalUsers: usersData.users.totalUsers,
        users: usersInRange,
      };
    },
    getUser: (_: any, { userId }: { userId: number }) => {
      const userInfo = usersData.users.users.find((user) => user.id === userId);
      console.log(userId);
      return userInfo;
    },
    getRoles: () => usersData.roles,
    searchUser: (
      _: any,
      {
        input,
        begin,
        end,
      }: {
        input: string;
        begin: number;
        end: number;
      }
    ) => {
      const lowerInput = input.toLowerCase();
      console.log(lowerInput);
      if (input === "") {
        return {
          totalUsers: usersData.users.totalUsers,
          users: usersData.users.users.slice(begin - 1, end),
        };
      }
      const allMatchedUsers = usersData.users.users.filter(
        (user) =>
          user.firstName.toLowerCase().startsWith(lowerInput) ||
          user.lastName.toLowerCase().startsWith(lowerInput) ||
          user.username.toLowerCase().startsWith(lowerInput) ||
          user.email.toLowerCase().startsWith(lowerInput)
      );
      return {
        users: allMatchedUsers.slice(begin - 1, end),
        totalUsers: allMatchedUsers.length,
      };
    },
  },
  Mutation: {
    /*
    addUser: (_: any, { userInfo }: { userInfo: UserObj }) => {
      console.log("hello");
      console.log(userInfo);
      if (userInfo && userInfo.id) {
        const userExists = usersData.users.users.some(
          (user) => user.id === userInfo.id
        );

        if (userExists) {
          console.log("User already exists with id:", userInfo.id);
          return false;
        }

        usersData.users.users.push(userInfo);
        return true;
      }
      return false;
    },
    */
    createUser: (_: any, { user }: { user: UserObj }) => {
      console.log("hello");
      console.log(user);
      if (user && user.id) {
        usersData.users.users.push(user);
        usersData.users.totalUsers = usersData.users.totalUsers + 1; // update total count
        return true;
      }
      return false;
    },
    updateUser: (_: any, { user, userId }: { user: User; userId: number }) => {
      if (userId) {
        usersData.users.users = usersData.users.users.map((user) =>
          user.id === userId ? user : user
        );
      }
    },
    deleteUser: (_: any, { id }: { id: number }) => {
      console.log("id for delete", id);
      if (id) {
        usersData.users.users = usersData.users.users.filter(
          (user) => user.id !== id
        );
        usersData.users.totalUsers = usersData.users.totalUsers - 1; // update total count
        return true;
      }
      return false;
    },
  },
};

export default resolvers;
