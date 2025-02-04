export interface ClientRepository {
  create(client): Promise<any>;
  get(): Promise<any>;
  update(client): Promise<any>;
  save(client): Promise<any>;
}
