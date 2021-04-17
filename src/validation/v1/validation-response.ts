export default class ValidationResponse {
  valid: boolean;

  status: number;

  message: string;

  constructor(valid: boolean, status: number, message: string) {
    this.valid = valid;
    this.status = status;
    this.message = message;
  }
}
