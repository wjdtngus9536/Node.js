import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({unique: true})
    email: string;

    @Column()
    pw: string;

    @Column()
    username: string;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP"}) // 쿼리 데이터 타입 DATETIME, 기본 값 현재시간, 이렇게까지 설정하면 new Date()는 없어도 되지 않나?
    createdDt: Date = new Date();
}