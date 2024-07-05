import { PartialType } from '@nestjs/mapped-types';
import { CreatesubscriptionLinkDto } from './create-subscription-link.dto';

export class UpdatesubscriptionLinkDto extends PartialType(CreatesubscriptionLinkDto) {}
