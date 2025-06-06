import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';

@Entity()
@Unique(["username"]) // Garante que o username seja único
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @IsNotEmpty()
    username: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    password: string; // A senha deve ser armazenada como hash
}