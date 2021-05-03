export class NacelleBase {
  id: string;

  constructor(params: any) {
    if (!params.id) {
      throw new Error('Nacelle mapper objects must have an ID passed in the parameter');
    } else {
      this.id = String(params.id);
    }
  }
}

export default { NacelleBase };
