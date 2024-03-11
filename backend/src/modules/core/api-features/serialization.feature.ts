import { plainToInstance } from "class-transformer";
import { ISerializationFeature } from "../interfaces/serialization.interface";

export class SerializationFeature implements ISerializationFeature {
  constructor(private readonly serializerClass: any) {
    if (!serializerClass) {
      throw new Error("serializerClass is not defined");
    }
  }

  public serialize(data: any): any[] {
    return plainToInstance(this.serializerClass, data, {
      excludeExtraneousValues: true,
      enableCircularCheck: true,
      enableImplicitConversion: true,
    });
  }
}
