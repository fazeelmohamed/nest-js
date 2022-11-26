import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entity/event.entity';

@Controller('/events')
export class EventsController {
  constructor() {}

  private events: Event[] = [];

  @Get()
  findAll(): Event[] {
    return this.events;
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    const found = this.events.find(e => e.id === parseInt(id));
    return found || 'No result';
  }

  @Post()
  create(@Body() data: CreateEventDto) {

    const date = new Date(data.when);

    if(!date || date.toString() === 'Invalid Date' ) return 'Invalid date format should be in (yyyy-mm-dd)';

    const event: Event = {
      ...data,
      when: new Date(data.when),
      id: this.events.length + 1
    };
    this.events.push(event);
    return event;
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() data: UpdateEventDto) {
    const index = this.events.findIndex(e => e.id === parseInt(id));
    this.events[index] = {
      ...this.events[index],
      ...data,
      when: data.when ? new Date(data.when) : this.events[index].when
    };
    return this.events[index];
  }

  @Delete('/:id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    this.events = this.events.filter(e => e.id !== parseInt(id));
  }
}


