import { GetUsersDTO } from "../../user/dto/create.user.dto";

export interface CRUD {
  list: () => Promise<Array<GetUsersDTO>>;
  create: (resource: any) => Promise<GetUsersDTO>;
  deleteById: (id: string) => Promise<any>;
}
