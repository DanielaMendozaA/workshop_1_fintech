import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/entity/user/user.entity";


@Entity()
export class FinancialRecord {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    amount: number;

    @Column()
    description: string;

    @ManyToOne(() => User, user => user.financialHistory)
    user: User;
}
