import debug from "debug";
import MongooseService from "../../common/service/mongoose.service";
import { CreateUserDTO } from "../dto/create.user.dto";

const log: debug.IDebugger = debug("app:in-memory-dao");

class UsersDAO {
  Schema = MongooseService.getMongoose().Schema;

  userSchema = new this.Schema(
    {
      first_name: { type: String, required: true },
      last_name: { type: String },
      username: { type: String, required: true, unique: true },
      name_prefix: { type: String },
      date_of_birth: {
        type: String,
        required: true,
        match: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
      }
    },
    { id: false }
  );

  User = MongooseService.getMongoose().model("Users", this.userSchema);

  constructor() {
    log("Created new instance of UsersDao");
  }

  async addUser(userFields: CreateUserDTO) {
    const name_prefix = `${userFields.first_name[0].toUpperCase()}${
      userFields.last_name ? userFields?.last_name[0].toUpperCase() : ""
    }`;

    const user = new this.User(userFields);
    user.name_prefix = name_prefix;
    await user.save();

    return {
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      name_prefix: user.name_prefix,
      date_of_birth: user.birth_date
    };
  }

  async getUsers() {
    return this.User.find().select("-_id -__v").exec();
  }

  async removeUserByUsername(username: string) {
    return this.User.deleteOne({ username: username }).exec();
  }

  async getUserByUsername(username: string) {
    return this.User.findOne({ username: username }).exec();
  }
}

export default new UsersDAO();