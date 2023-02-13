import { Server } from './Server';

import { config } from 'dotenv';
import * as process from 'process';

config();
Server.getInstance('Account', '4.0.3', Number(process.env.PORT) || 5000).listen();
