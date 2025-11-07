import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        // Usar ConfigService ou process.env como fallback
        const getEnv = (key: string, defaultValue?: string) => {
          const configValue = configService.get(key);
          const envValue = process.env[key];
          return configValue || envValue || defaultValue;
        };

        // Forçar leitura da senha - se estiver vazia, usar 'root123' como padrão para Docker
        let password = getEnv('DB_PASSWORD', '');
        if (!password || password.trim() === '') {
          password = 'root123';
        }

        const dbConfig = {
          type: 'mysql' as const,
          host: getEnv('DB_HOST', 'localhost'),
          port: parseInt(getEnv('DB_PORT', '3306'), 10),
          username: getEnv('DB_USERNAME', 'root'),
          password: password,
          database: getEnv('DB_DATABASE', 'nestjs_db'),
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          migrations: [__dirname + '/../migrations/*{.ts,.js}'],
          migrationsRun: true,
          synchronize: false,
          logging: getEnv('DB_LOGGING', 'false') === 'true',
          charset: 'utf8mb4',
          timezone: 'Z',
        };

        return dbConfig;
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
