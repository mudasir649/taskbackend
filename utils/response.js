export const successResponse = async (res, message, success, data) => {
    return res.status(200).json({
      message: message,
      success: success,
      data: data,
    });
  };
  
export const failedResponse = (res, message, success) => {
    return res.status(200).json({
      message: message,
      success: success,
    });
  };