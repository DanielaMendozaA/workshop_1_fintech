import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user/user.entity';
import { Repository } from 'typeorm';
import { Microcredits } from './entity/microcredits/microcredits.entity';
import { UserService } from 'src/users/users.service';

//Esta forma no es correcta ya que no respeta el principio de responsabilidad única

// @Injectable()
// export class MicrocreditsService {
//     constructor(@InjectRepository(User)
//     private readonly userRepository: Repository<User>,
//     @InjectRepository(Microcredits)
//     private readonly microcreditsRepository: Repository<Microcredits>
//     ){}

//     private calculateInterestRate(user: User): number {
//         return user.creditScore > 700 ? 5 : 15;


//     }

//     private saveMicrocredit(microcredit: Microcredits){
//         return this.microcreditsRepository.save(microcredit);
//     }

//     async applyForMicrocredit(userId : string, amount: number){
//         const user = await this.userRepository.findOne( { where : {id: userId} } );
//         const interestRate = this.calculateInterestRate(user);

//         const microcredit = new Microcredits(userId, amount, interestRate, 'pending');
//         this.saveMicrocredit(microcredit);

//         return microcredit;
//     }


// }

@Injectable()
export class MicrocreditsFactory{
    create(userId: string, amount: number, interestRate: number, status: string){
        return new Microcredits(userId, amount, interestRate, status);
    }
}

@Injectable()
export class MicroCreditCalculationService {
  constructor(private readonly userService: UserService) {}

  async calculateInterestRate(userId: string): Promise<number> {
    const user: User = await this.userService.findUserById(userId);
    return user.creditScore > 700 ? 5 : 15;
  }
}

@Injectable()
export class MicrocreditRegistryService{
    constructor(@InjectRepository(Microcredits)
    private readonly microcreditsRepository: Repository<Microcredits>
    ){}
    async saveMicrocredit(microcredit: Microcredits){
        return await this.microcreditsRepository.save(microcredit);
    }
}

@Injectable()
export class MicrocreditsService {
    constructor(@InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly creditCalculationService: MicroCreditCalculationService,
    private readonly microcreditRegistryService: MicrocreditRegistryService,
    private readonly microcreditsFactory: MicrocreditsFactory
    ){}

    async applyForMicrocredit(userId : string, amount: number){
        const interestRate = this.creditCalculationService.calculateInterestRate(userId);

        const microcredit = this.microcreditsFactory.create(userId, amount, await interestRate, 'pending');
        await this.microcreditRegistryService.saveMicrocredit(microcredit);

        return microcredit;
    }
}



// Principle OCP (open/closed principle)

//Esta forma no cumple el principio OCP ya que si se quiere agregar un nuevo tipo de crédito se tendría que modificar la clase CreditCalculationService
// @Injectable()
// export class CreditCalculationService{

//     calculateInterestRate(user: User): number {
//         if(user.creditScore > 700){
//             return 5
//         }else if(user.creditScore > 500){
//             return 10

//         }else{
//             return 15
//         }
//     }

// }

interface InterestRateStrategy{
    calculateInterestRate(user: User): number;
}

@Injectable()
export class StandardInterestRateStrategy implements InterestRateStrategy{
    calculateInterestRate(user: User): number{
        return user.creditScore > 700 ? 5 : 15;
    }
}

@Injectable()
export class PremiumInterestRateStrategy implements InterestRateStrategy{
    calculateInterestRate(user: User): number{
        return user.creditScore > 700 ? 3 : 10;
    }
}

@Injectable()
export class CreditCalculationService{
    private strategy: InterestRateStrategy;

    constructor(strategy: InterestRateStrategy){
        this.strategy = strategy;
    }

    calculateInterestRate(user: User): number{
        return this.strategy.calculateInterestRate(user);
    }


}


// Principle LSP (Liskov substitution principle)

//Esta forma no cumple el principio LSP ya que no se puede sobrescribir el método apply de la clase base Microcredits


// class Microcredit {
//     apply(): void {
//       // Lógica genérica para aplicar un microcrédito
//     }
//   }

// class BasicMicrocredit extends Microcredit {
// constructor(userId: string, amount: number) {
//     super();
// }

// // Sobrescribe un método de la clase base, pero no funciona con todas las subclases
// override apply(): void {
//     // Lógica específica para microcréditos básicos
// }
// }

// class AdvancedMicrocredit extends Microcredit {
// constructor(userId: string, amount: number) {
//     super();
// }

// override apply(): void {
//     // Lógica específica para microcréditos avanzados
// }
// }

interface IMicrocredit {
    apply(): void;
}

class Microcredit implements IMicrocredit {
    apply(): void {
        console.log("Aplicando microcrédito genérico");
    }
}

class BasicMicrocredit extends Microcredit {
    // No es necesario sobrescribir el método apply si no altera el comportamiento
}

class AdvancedMicrocredit extends Microcredit {
    apply(): void {
        console.log("Aplicando microcrédito avanzado con lógica adicional");
    }
}

function processMicrocredit(microcredit: IMicrocredit): void {
    microcredit.apply();
}

const basicMicrocredit: IMicrocredit = new BasicMicrocredit();
const advancedMicrocredit: IMicrocredit = new AdvancedMicrocredit();

processMicrocredit(basicMicrocredit);
processMicrocredit(advancedMicrocredit); 