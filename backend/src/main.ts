import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import {AppModule} from "./app.module";

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));
  app.enableCors({origin:true});

  app.use(rateLimit({ windowMs: 60 * 1000, max: 100 }));
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log('Backend running on http://localhost:${port}');
  }

bootstrap ();
