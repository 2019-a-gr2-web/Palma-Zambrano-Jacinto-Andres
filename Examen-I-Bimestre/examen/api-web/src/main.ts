import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieParser = require('cookie-parser');
import {NestExpressApplication} from "@nestjs/platform-express";
import {join} from 'path';
import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';


async function bootstrap() {
  const app = await NestFactory.create(AppModule) as NestExpressApplication;
  app.use(cookieParser('DANCE'));
  app.set('view engine','ejs');
  app.setBaseViewsDir(join(__dirname,'..','views'));
  app.use(express.static('publico'));
  app.use(favicon(path.join(__dirname,'..','publico','images','examen-favicon.ico')));
  await app.listen(3001);

}
bootstrap();
