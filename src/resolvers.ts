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
  email: string;
  title: string;
  isConfigAdmin: boolean;
  enabled: boolean;
  roles: string[];
}

interface UserObj {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  isConfigAdmin: boolean;
  enabled: boolean;
  roles: string[];
}

interface UserData {
  totalUsers: number;
  users: User[];
}

interface Users {
  userData: UserData;
  roles: Role[]; // Adjust to match the structure if needed
}

const usersData: Users = users;

const resolvers = {
  Query: {
    getUsers: (
      _: any,
      {
        startUserNum,
        endUserNum,
      }: {
        startUserNum: number;
        endUserNum: number;
      }
    ) => {
      if (typeof startUserNum !== "number" || typeof endUserNum !== "number") {
        throw new Error("Invalid arguments");
      }
      const usersInRange = usersData.userData.users.slice(
        startUserNum - 1,
        endUserNum - 1
      );
      return {
        totalUsers: usersData.userData.totalUsers,
        users: usersInRange,
      };
    },
    getUser: (_: any, { userId }: { userId: number }) => {
      const userInfo = usersData.userData.users.find(
        (user) => user.id === userId
      );
      console.log(userId);
      return userInfo;
    },
    getRoles: () => usersData.roles,
  },
  Mutation: {
    /*
    addUser: (_: any, { userInfo }: { userInfo: UserObj }) => {
      console.log("hello");
      console.log(userInfo);
      if (userInfo && userInfo.id) {
        const userExists = usersData.userData.users.some(
          (user) => user.id === userInfo.id
        );

        if (userExists) {
          console.log("User already exists with id:", userInfo.id);
          return false;
        }

        usersData.userData.users.push(userInfo);
        return true;
      }
      return false;
    },
    */
    addUser: (_: any, { user }: { user: UserObj }) => {
      console.log("hello");
      console.log(user);
      if (user && user.id) {
        usersData.userData.users.push(user);
        usersData.userData.totalUsers = usersData.userData.totalUsers + 1; // update total count
        return true;
      }
      return false;
    },
    updateUser: (_: any, { user, userId }: { user: User; userId: number }) => {
      if (userId) {
        usersData.userData.users = usersData.userData.users.map((user) =>
          user.id === userId ? user : user
        );
      }
    },
    deleteUser: (_: any, { id }: { id: number }) => {
      console.log("id for delete", id);
      if (id) {
        usersData.userData.users = usersData.userData.users.filter(
          (user) => user.id !== id
        );
        usersData.userData.totalUsers = usersData.userData.totalUsers - 1; // update total count
        return true;
      }
      return false;
    },
  },
};

export default resolvers;
