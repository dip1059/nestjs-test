export interface ResponseData {
  success: boolean;
  message: string;
  data: object;
}

export class BaseResponse {
  protected successResponse: ResponseData = {
    success: true,
    message: '',
    data: null,
  };
  protected errorResponse: ResponseData = {
    success: false,
    message: 'Something went wrong',
    data: null,
  };
}
