export interface IClient {
  fullName: string,
  CPF: string,
  password: string,
  balance: number,
  save(): void, 
  remove(): void,
}
