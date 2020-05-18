import Ajv from 'ajv';

class JsonSchemaValidator {

  private readonly schemaValidator = new Ajv();
  private jsonSchema: object = {};

  constructor(jsonSchemaFilePath: string) {
    this.jsonSchema = require(jsonSchemaFilePath);
  }

  async isJsonBodyValid(jsonBody: any): Promise<boolean>  {
    const isJsonBodyValid: boolean = await this.schemaValidator
      .validate(this.jsonSchema, jsonBody);
    return isJsonBodyValid;
  }

}

export { JsonSchemaValidator };
