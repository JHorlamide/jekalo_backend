export interface CreateUserDTO {
  first_name: string;
  last_name?: string;
  username: string;
  date_of_birth: string;
}

export type GetUsersDTO = {
  first_name: string;
  last_name?: string;
  username: string;
  date_of_birth: string;
  name_prefix: string;
};
