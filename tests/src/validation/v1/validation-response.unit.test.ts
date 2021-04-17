import ValidationResponse from '../../../../src/validation/v1/validation-response';

const valid = false;
const status = 422;
const message = 'invalid input received: missing product handle';
const response = new ValidationResponse(valid, status, message);

test('Constructor sets valid', () => {
  expect(response.valid).toBe(valid);
});

test('Constructor sets status', () => {
  expect(response.status).toBe(status);
});

test('Constructor sets message', () => {
  expect(response.message).toBe(message);
});
