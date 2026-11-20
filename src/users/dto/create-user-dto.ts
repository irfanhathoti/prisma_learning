import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @MaxLength(50)
  @MinLength(2)
  @IsString({ message: 'name must be a string' })
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @MaxLength(100)
  @IsEmail({}, { message: 'email must be a valid email' })
  @IsNotEmpty({ message: 'email is required' })
  email: string;

  @Max(120)
  @Min(1)
  @IsInt({ message: 'age must be an integer' })
  @IsNotEmpty({ message: 'age is required' })
  age: number;

  @IsOptional()
  @IsBoolean()
  isMarried?: boolean;

  @MaxLength(56)
  @MinLength(2)
  @IsString({ message: 'nationality must be a string' })
  @IsNotEmpty({ message: 'nationality is required' })
  nationality: string;
}
