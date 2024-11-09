export class ResponseBuilder<T> {
  private isSuccessfully: boolean;
  private payload: T;
  private messageContent: string; 
  private statusCode: number;

  setSuccess(success: boolean, message: string): ResponseBuilder<T> {
    this.isSuccessfully = success;
    this.messageContent = message; 
    return this;
  }

  setPayload(payload: T): ResponseBuilder<T> {
    this.payload = payload;
    return this;
  }

  setStatusCode(code: number): ResponseBuilder<T> {
    this.statusCode = code;
    return this;
  }

  build() {
    return {
      statusCode: this.statusCode,
      isSuccessfully: this.isSuccessfully,
      Message: this.messageContent, 
      payload: this.payload,
    };
  }

  // Method 'message' tetap dipertahankan
  message(message: string): ResponseBuilder<T> {
    this.messageContent = message; 
    return this;
  }

  static success<T>(payload: T, message: string = 'Success') {
    return new ResponseBuilder<T>()
      .setSuccess(true, message)
      .setStatusCode(200)
      .message(message)  // Method 'message' tetap dipertahankan
      .setPayload(payload)
      .build();
  }

  static created<T>(payload: T, message: string = 'Created') {
    return new ResponseBuilder<T>()
      .setSuccess(true, message)
      .setStatusCode(201)
      .message(message)  // Method 'message' tetap dipertahankan
      .setPayload(payload)
      .build();
  }

  static error<T>(message: string = 'Error', payload: T = null) {
    return new ResponseBuilder<T>()
      .setSuccess(false, message)
      .setStatusCode(500)
      .message(message)  // Method 'message' tetap dipertahankan
      .setPayload(payload)
      .build();
  }

  static badRequest<T>(message: string = 'Bad Request', payload: T = null) {
    return new ResponseBuilder<T>()
      .setSuccess(false, message)
      .setStatusCode(400)
      .message(message)  // Method 'message' tetap dipertahankan
      .setPayload(payload)
      .build();
  }

  static notFound<T>(message: string = 'Not Found', payload: T = null) {
    return new ResponseBuilder<T>()
      .setSuccess(false, message)
      .setStatusCode(404)
      .message(message)  // Method 'message' tetap dipertahankan
      .setPayload(payload)
      .build();
  }
}
