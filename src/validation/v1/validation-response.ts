// THIS IS NOT BEING USED
// Example for future validation if needed
export default class ValidationResponse {
  valid: boolean;

  status: number;

  message: string;

  cleansedData: any;

  constructor(valid: boolean, status: number, message: string, cleansedData: any) {
    this.valid = valid;
    this.status = status;
    this.message = message;
    this.cleansedData = cleansedData;
  }
}
