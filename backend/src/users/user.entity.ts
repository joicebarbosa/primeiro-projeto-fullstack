import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { IsString, IsNotEmpty, IsAlphanumeric } from 'class-validator';

@Entity()
@Unique(["username"]) // Garante que o username seja único
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @IsNotEmpty()
    @IsAlphanumeric() // Garante que o username seja alfanumérico
    username: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    password: string; // A senha deve ser armazenada como hash
}