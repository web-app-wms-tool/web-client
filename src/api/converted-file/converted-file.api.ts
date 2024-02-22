import { sdk } from "../axios";

export interface ConvertedFile {
  id: string | number;
  name: string;
  path: string;
  created_at?: Date;
  updated_at?: Date;
}

export const ConvertedFileApi = {
  listAgGrid: (params?: any) => sdk.post("converted-file-list", params),
};

export default ConvertedFileApi;
