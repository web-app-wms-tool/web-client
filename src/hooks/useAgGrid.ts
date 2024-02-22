import {
  ApiListReturn,
  AxiosResponseListReturn,
  Paginate,
} from "@/interface/axios";
import {
  GridApi,
  IServerSideDatasource,
  IServerSideGetRowsParams,
  SortModelItem,
} from "ag-grid-community";
import { v4 as uuidv4 } from "uuid";
export class DataSource<T = any> implements IServerSideDatasource {
  public pagination: Paginate;
  public callback: CallbackGetData<T>;
  public successCallback: CallbackSuccess<T>;
  public rowCount?: number | undefined;
  public id: string;
  public api?: GridApi;
  public defaultParams?: object;
  public filterModel?: object;
  public params?: any;
  constructor(
    callback: CallbackGetData<T>,
    successCallback: CallbackSuccess<T>,
    pagination: Paginate = {
      count: 1,
      hasMoreItems: true,
      itemsPerPage: 1,
      page: 1,
      total: 1,
      totalPage: 1,
    },
    defaultParams = {}
  ) {
    this.id = uuidv4();
    this.callback = callback;
    this.successCallback = successCallback;
    this.pagination = pagination;
    this.defaultParams = defaultParams;
  }
  setDefaultParams(params: any) {
    this.params = params;
  }
  setGridApi(api: GridApi) {
    this.api = api;
  }
  getRows(params: IServerSideGetRowsParams) {
    if (this.api) {
      this.api.showLoadingOverlay();
    }
    const itemsPerPage = this.pagination.itemsPerPage;
    let page = this.pagination.page;
    if (
      this.filterModel &&
      JSON.stringify(this.filterModel) !=
        JSON.stringify(params.request.filterModel)
    ) {
      page = 1;
    }
    this.filterModel = params.request.filterModel;
    let rowsThisPage: any[] = [];
    this.callback({
      page,
      itemsPerPage,
      paginate: true,
      sortModel: this.params ? this.params.sortModel : params.request.sortModel,
      filterModel: this.params
        ? this.params.filterModel
        : params.request.filterModel,
      ...this.defaultParams,
    })
      .then((res) => {
        rowsThisPage = res.data.list;
        this.rowCount = rowsThisPage.length;
        params.successCallback(rowsThisPage, rowsThisPage.length);

        if (this.successCallback) {
          this.successCallback(res.data, params);
        }
        this.params = undefined;
      })
      .catch(() => {
        params.failCallback();
      })
      .finally(() => {
        if (this.api) {
          this.api.hideOverlay();
          if (rowsThisPage.length === 0) {
            this.api.showNoRowsOverlay();
          }
        }
      });
  }
}

export type CallbackGetData<T = any> = (
  _params: CallbackParams
) => Promise<AxiosResponseListReturn<T>>;

export type CallbackSuccess<T = any> = (
  data: ApiListReturn<T>,
  params?: IServerSideGetRowsParams
) => void;
export type CallbackParams = {
  page: number;
  itemsPerPage: number;
  paginate: true;
  sortModel: SortModelItem[];
  filterModel: any;
};
