import Ajv from 'ajv';
import consumerJsonSchema from '../../api/rest/consumer/consumer-schema.json';
import courierJsonSchema from '../../api/rest/courier/courier-schema.json';

class JsonSchemaValidator {

  private readonly schemaValidator = new Ajv();
  private readonly CONSUMER_SCHEMA: string = 'consumer schema';
  private readonly COURIER_SCHEMA: string = 'courier schema';

  async isJsonBodyValid(
    jsonBody: object, entitySchema: string): Promise<boolean> {
    let jsonSchema: object = {};
    if (entitySchema === this.CONSUMER_SCHEMA) {
      jsonSchema = consumerJsonSchema;
    }
    else if (entitySchema === this.COURIER_SCHEMA) {
      jsonSchema = courierJsonSchema;
    }

    const isJsonBodyValid: boolean = await this.schemaValidator
      .validate(jsonSchema, jsonBody);
    return isJsonBodyValid;
  }

}

export { JsonSchemaValidator };
