import { Controller, Get, UseGuards } from '@nestjs/common';
import { States } from '../../entities/States';
import { AuthGuard } from '../../security/guards/auth.guard';
import { StateService } from './state.service';

@Controller('state')
@UseGuards(AuthGuard)
export class StateController {

    constructor(
        private stateService: StateService,
    ) {

    }

    @Get()
    async findAll(): Promise<States[]> {
        return this.stateService.findAll();
    }
}
