export class ErrorResponseException extends Error {
  #errorResponse;

  constructor(message) {
    super(message);
  }

  setErrorResponse(response) {
    this.#errorResponse = response;
    return this;
  }

  getErrorResponse() {
    return this.#errorResponse;
  }
}
