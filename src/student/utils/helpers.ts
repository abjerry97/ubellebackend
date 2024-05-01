export const OkResponse = (message: string, statusCode, data?: any) => {
    return {
      success: true,
      statusCode,
      message,
      data,
    };
  };