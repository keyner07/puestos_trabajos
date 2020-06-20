import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import errorException from '../utils/errors';
import { User } from '../entity/user.entity';
import { getRepository } from 'typeorm';

import config from '../config/index';

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret,
};

export default new Strategy(opts, async (payload, done) => {
    try {
        const user = await getRepository(User);
        const { exp } = payload;
        if (exp < Date.now()) {
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        }
        return done(null, false);
    } catch (err) {
        throw new errorException(500,err);
    }
});
