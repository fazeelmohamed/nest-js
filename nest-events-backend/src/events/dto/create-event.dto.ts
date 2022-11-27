import { IsDateString, IsString, Length } from "class-validator";

export class CreateEventDto {

  @IsString()
  @Length(5,15, {message: 'The name length is wrong', groups: ['create', 'update']})
  name: string;

  @Length(5,255, { groups: ['create', 'update']})
  description: string;

  @IsDateString({ groups: ['create', 'update']})
  when: string;

  @Length(5,255, {groups: ['create']})
  @Length(10,100, {groups: ['update']})
  address: string;
}


