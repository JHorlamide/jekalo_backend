import UserDAO from "../daos/users.dao";
import { CRUD } from "../../common/interfaces/crud.interface";
import { CreateUserDTO } from "../dto/create.user.dto";

class UserService implements CRUD {
  async list() {
    return UserDAO.getUsers();
  }

  async create(resource: CreateUserDTO) {
    return UserDAO.addUser(resource);
  }

  async deleteById(username: string) {
    return UserDAO.removeUserByUsername(username);
  }

  async getUserByUsername(username: string) {
    return UserDAO.getUserByUsername(username);
  }
}

export default new UserService();
