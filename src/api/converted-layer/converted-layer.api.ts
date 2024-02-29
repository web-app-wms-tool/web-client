import { sdk } from "../axios";

export interface ConvertedLayer {
  id: string | number;
  name: string;
  path: string;
  created_at?: Date;
  updated_at?: Date;
}

export const ConvertedLayerApi = {
  listAgGrid: (params?: any) => sdk.post("converted-layer-list", params),
};

export default ConvertedLayerApi;
