import { User } from "src/users/entity/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Microcredits {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    amount: number;

    @Column()
    interestRate: number;

    @Column()
    status: string;

    @ManyToOne(() => User, user => user.microcredits)
    user: User;

    constructor(userId: string, amount: number, interestRate: number, status: string){
        this.user = new User();
        this.user.id = userId;
        this.amount = amount;
        this.interestRate = interestRate;
        this.status = status;
    }


}
