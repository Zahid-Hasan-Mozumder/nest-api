import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        super ({
            datasources: {
                db: {
                    url: process.env.DATABASE_URL
                }
            }
        })
    }

    signup() {
        return "I have signed up"
    }

    signin() {
        return "I have signed in"
    }
}
