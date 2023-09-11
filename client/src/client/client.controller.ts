import { Body, Controller, Post, Get, Put, Delete, Param, ParseIntPipe, UseGuards, UnauthorizedException } from '@nestjs/common';
import { CreateClientDto, ResponseDto, SigninDto, UpdateClientDto, UpdateClientLocationDto } from './dtos/client.dto'
import { ClientService } from './client.service';
import { EventPattern } from '@nestjs/microservices';
import { CreateUserEvent } from './create-user.event';


@Controller('client')
export class ClientController {

    constructor(private readonly clientService: ClientService) { }


  @EventPattern('user_created')
  handleUserCreated(data: CreateUserEvent) {
    this.clientService.handleUserCreated(data);
  }

    @Post()
    async createClient(
        @Body() body: CreateClientDto,
    ) {
       
        const createdClient = await this.clientService.createClient(body)
        return createdClient
    }

    @Get()
    async getAllClients(
    ): Promise<ResponseDto[]> {
        // console.log(user)
        return await this.clientService.getClients()
    }

    @Get("/:id")
    async getClientById(
        @Param("id", ParseIntPipe) id: number
    ): Promise<ResponseDto> {
        
        const client = await this.clientService.getClient(id)
        // this.logger.log('getting client by id' + client);
        return client
    }

    @Put("/:id")
    async updateClientDetails(
        @Param('id') id: number,
        @Body() body: UpdateClientDto,
        // @User() user
        ) {
        console.log(body)
        // if (user.id === id) throw new UnauthorizedException()
        return await this.clientService.updateClientDetails(body, id)
    }

    @Put("/:clientId/location/:id")
    async updateClientLocation(
        @Param('clientId') clinetId: number,
        @Param('id') locationId: number,
        @Body() body: UpdateClientLocationDto
    ) {
        await this.clientService.updateClientLocation(body, clinetId, locationId)
    }

    @Delete("/:id")
    async deleteClientDetails(@Param('id') id: number) {
        return await this.clientService.deleteClient(id)
    }
}