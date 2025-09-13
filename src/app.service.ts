import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataLogs } from './entities/DataLogs';

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(DataLogs)
    private dataLogRepo: Repository<DataLogs>,
  ) { }

  async registerLog(username: string, action: string, table_number: number | null = null, details: string | null = null): Promise<any> {
    return await this.dataLogRepo.createQueryBuilder()
      .insert()
      .into(DataLogs)
      .values({
        table_id: table_number,
        username: username,
        action: action,
        details: details,
      })
      .execute();
  }


}
