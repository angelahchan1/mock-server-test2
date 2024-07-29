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
      const usersInRange = usersData.userData.users.filter(
        (user: User) => user.id >= startUserNum && user.id < endUserNum
      );
      return {
        ...usersData,
        userData: {
          ...usersData.userData,
          users: usersInRange,
        },
      };
    },
    getUser: ({ userId }: { userId: number }) => {
      const userInfo = usersData.userData.users.find(
        (user) => user.id === userId
      );
      console.log(userId);
      return userInfo;
    },
    getRoles: () => usersData.roles,
  },
  Mutation: {
    addUser: ({ userInfo }: { userInfo: User }) => {
      if (userInfo && userInfo.id) {
        usersData.userData.users.push(userInfo);
        return true;
      }
      return false;
    },
    updateUser: ({ userInfo, userId }: { userInfo: User; userId: number }) => {
      if (userId) {
        usersData.userData.users = usersData.userData.users.map((user) =>
          user.id === userId ? userInfo : user
        );
      }
    },
    deleteUser: ({ id }: { id: number }) => {
      console.log("id for delete", id);
      if (id) {
        usersData.userData.users = usersData.userData.users.filter(
          (user) => user.id !== id
        );
        return true;
      }
      return false;
    },
  },
};

export default resolvers;
