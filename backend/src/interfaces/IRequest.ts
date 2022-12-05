import { Request } from "express";
import { IClient } from "./IClient";

export interface IRequest extends Request {
  client?: IClient,
  status?: number,
  receiverClient?: IClient,
  donorClient?: IClient,
}
