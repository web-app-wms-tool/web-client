import { sdk } from "../axios";

export interface UploadedFileMetadata {
  bbox?: any;
  layers?: String[];
  geometry_types?: String[];
}

export interface UploadedFile {
  id: string | number;
  name: string;
  path: string;
  dxf_path?: string;
  uuid: string;
  size: string | number;
  is_read_done: boolean;
  srs: string;
  created_at?: Date;
  updated_at?: Date;
  metadata?: UploadedFileMetadata;
}

export const UploadedFileApi = {
  listAgGrid: (params?: any) => sdk.post("uploaded-file-list", params),
  update: (id: string | number, data: UploadedFile) =>
    sdk.post(`uploaded-file/${id}`, data),
  convert: (id: string | number, params: any) =>
    sdk.post(`uploaded-file/${id}/convert`, params),
};

export default UploadedFileApi;
