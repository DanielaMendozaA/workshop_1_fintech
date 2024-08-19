import { Body, Controller, Post } from '@nestjs/common';
import { MicroCreditCalculationService, MicrocreditRegistryService, MicrocreditsFactory, MicrocreditsService } from './microcredits.service';
import { CreateMicrocredit } from './dto/create-microcredit/create-microcredit';

@Controller('microcredits')
export class MicrocreditsController {
    constructor(
        private readonly microcreditsService: MicrocreditsService,
        private readonly microcreditsFactory: MicrocreditsFactory,
        private readonly microcreditsCalculationService: MicroCreditCalculationService,
        private readonly microcreditsRegistryService: MicrocreditRegistryService
    ) {}

    @Post()
    async createMicrocredit(@Body() createMicrocreditDto: CreateMicrocredit) {
        const { userId, amount } = createMicrocreditDto;
        const interestRate = this.microcreditsCalculationService.calculateInterestRate(userId);
        const microcredit = this.microcreditsFactory.create(userId, amount, await interestRate, 'pending');
        await this.microcreditsRegistryService.saveMicrocredit(microcredit);
        return microcredit;
    } 


}
