import { __ } from 'src/helpers';

export interface ResponseData {
  success: boolean;
  message: string;
  data: object;
}

export class BaseResponse {
  protected successResponse(data = null, message = ''): ResponseData {
    return { success: true, message: message, data: data };
  }
  protected errorResponse(message?: string, data = null): ResponseData {
    return {
      success: false,
      message: message || __('Something went wrong'),
      data: null,
    };
  }
}
