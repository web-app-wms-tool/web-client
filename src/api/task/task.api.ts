import { sdk } from "../axios";

export interface Task {
  id: string | number;
  name: string;
  email: string;
  status: number;
  status_full_text: string;
  start_at: Date;
  end_at: Date;
  error: string;
  queue_name: string;
  created_at?: Date;
  updated_at?: Date;
}

const TaskApi = {
  //   list: (params?: any) => sdk.post("task-list", params),
};

export default TaskApi;
