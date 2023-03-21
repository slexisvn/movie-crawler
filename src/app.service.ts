import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import * as moment from 'moment';
import puppeteer from 'puppeteer';

import { RevenueDay, RevenueDayDocument } from './schemas/revenueDay.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(RevenueDay.name)
    private readonly revenueDayModel: Model<RevenueDayDocument>,
  ) {}

  private readonly logger = new Logger(AppService.name);

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleCron() {
    try {
      this.logger.debug('Called when the minute is 5');
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://boxofficevietnam.com/', {
        waitUntil: 'networkidle2',
      });
      const tableElement = await page.waitForSelector('#table_1');
      const result = await tableElement.$$eval('tbody tr', (trNodes) =>
        trNodes.map((trNode: HTMLElement) => {
          const tdNodes = trNode.querySelectorAll('td');
          const texts = [];

          tdNodes.forEach((node) => {
            texts.push(node.innerText);
          });

          return {
            movieName: texts[0],
            revenue: texts[1],
            numberOfTickets: texts[2],
            numberOfScreenings: texts[3],
            createdAt: moment().valueOf(),
          };
        }),
      );
      await this.revenueDayModel.create(result);
      console.log(result);
      await browser.close();
    } catch (err) {
      console.log(err);
    }
  }
}
