import { Module } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { AttributeController } from './attribute.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Attribute, AttributeModel } from './entities/attribute.entity';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: Attribute.name, schema: AttributeModel},
    ]),
  ],
  controllers: [AttributeController],
  providers: [AttributeService],
  exports: [AttributeService]
})
export class AttributeModule {}
