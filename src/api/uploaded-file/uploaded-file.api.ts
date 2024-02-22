import { sdk } from "../axios";

export interface UploadedFileMetadata {
  bbox?: Number[];
  layers?: String[];
  geometry_types?: String[];
}

export interface UploadedFile {
  id: string | number;
  name: string;
  path: string;
  dxf_path?: string;
  created_at?: Date;
  updated_at?: Date;
  metadata?: UploadedFileMetadata;
}

export const UploadedFileApi = {
  listAgGrid: (params?: any) => sdk.post("uploaded-file-list", params),
  convert: (id: string | number, params: any) =>
    sdk.post(`uploaded-file-list/${id}/convert`, params),
};

export default UploadedFileApi;
