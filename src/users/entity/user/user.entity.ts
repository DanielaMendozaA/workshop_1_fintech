import { FinancialRecord } from "src/financial-records/entity/financial-record/financial-record.entity";
import { Microcredits } from "src/microcredits/entity/microcredits/microcredits.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string;
    
    @Column()
    name: string;

    @Column()
    creditScore: number;

    // @Column("json", { array: true }) Este seria en caso de querer recibir un array de objetos pero no es recomendable con Mysql ya que no soporta este tipo de dato
    // financialHistory: FinancialRecord[];


    @OneToMany(() => FinancialRecord, financialRecord => financialRecord.user)
    financialHistory: FinancialRecord[];

    @OneToMany(() => Microcredits, microcredits => microcredits.user)
    microcredits: Microcredits[];

}
