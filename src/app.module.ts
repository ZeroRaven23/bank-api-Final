import { Module } from '@nestjs/common';

import { LoadConfig } from './config/index';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserController } from './routers/user/user.controller';
import { AccountController } from './routers/account/account.controller';
import { AddUserUseCase, GetUserUseCase, UserEntity } from './core/context/user';
import { AccountEntity } from './core/context/account/entity/account.entity';
import { PatchUserUseCase } from './core/context/user/use-case/patch-user-usecase';
import { DeleteUserUseCase } from './core/context/user/use-case/delete-user-usecase';
import { DeleteAccountUseCase, EditAccountUseCase, GetAccountUseCase,  TransferAccountUseCase } from './core/context/account';
import { CpfVeri } from './core/util/cpf';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [LoadConfig] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserEntity,AccountEntity]), //mapeamento de entity
    TerminusModule,
  ],
  controllers: [UserController,AccountController],//controllers
  
  providers: [GetUserUseCase,AddUserUseCase,
    PatchUserUseCase,DeleteUserUseCase,GetAccountUseCase, 
    EditAccountUseCase, DeleteAccountUseCase, TransferAccountUseCase,CpfVeri],//serviços
})
export class AppModule {}
