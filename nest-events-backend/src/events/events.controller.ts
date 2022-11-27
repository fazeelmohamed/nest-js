import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, Like } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entity/event.entity';

@Controller('/events')
export class EventsController {
  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>
  ) {}



  @Get()
  async findAll() {
    try {
      return await this.repository.find();
    } catch(e) {
      return 'No results';
    }
  }

  // @Get('/practice')
  // async practice() {
  //   return await this.repository.find({
  //     where:{id : MoreThan(3)}
  //   });
  // }

  @Get('/practice')
  async practice() {
    return await this.repository.find({
      select: ['id', 'name'],
      where: [
        {id : MoreThan(3), when: MoreThan(new Date('2021-02-12T13:00:00'))},
        {description: Like('%meet%')}
      ],
      take: 2,
      order: {
        id: 'DESC'
      }
    });
  }

  @Get('/:id')
  async findOne(@Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id : number) {
    try {
      return await this.repository.findOneBy({id});
    } catch(e) {
      return 'No result';
    }
  }

  
  @UsePipes()
  @Post()
  async create(@Body(new ValidationPipe({groups: ['create']})) data: CreateEventDto) {
    const date = new Date(data.when);
    if(!date || date.toString() === 'Invalid Date' ) return 'Invalid date format should be in (yyyy-mm-dd)';

    try {
      return await this.repository.save({
        ...data,
        when: new Date(data.when),
      });
    } catch(e) {
      return 'Could not create';
    }
    
  }

  @UsePipes()
  @Patch('/:id')
  async update(
    @Param('id') id, 
    @Body(new ValidationPipe({groups: ['update']})) data: UpdateEventDto) {

    try {
      const found = await this.repository.findOneBy({id});
      return await this.repository.save({
        ...found,
        ...data,
        when: data.when ? new Date(data.when) : found.when
      });
    } catch(e) {
      return 'Could not update';
    }
  }

  @Delete('/:id')
  @HttpCode(204)
  async remove(@Param('id') id) {
    try {
      const found = await this.repository.findOneBy({id});
      await this.repository.delete(found);
    } catch(e) {
      return 'Could not delete';
    }
  }
}


