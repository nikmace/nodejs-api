import UserModel from '@/resources/user/user.model';
import token from '@/utils/token';

export default class UserService {
    private user = UserModel;

    /**
     * Register new User
     */
    public async register(
        name: string,
        email: string,
        password: string,
        role: string
    ): Promise<string | Error> {
        try {
            const user = await this.user.create({
                name,
                email,
                password,
                role,
            });

            const accessToken = token.createToken(user);

            return accessToken;
        } catch (e) {
            throw new Error('Unable to create a user');
        }
    }

    /**
     * Attempt to login User
     */
    public async login(
        email: string,
        password: string
    ): Promise<string | Error> {
        try {
            const user = await this.user.findOne({ email });

            if (!user) {
                throw new Error('Unable to find User with that email address');
            }

            if (await user.isValidPassword(password)) {
                return token.createToken(user);
            } else {
                throw new Error('Wrong credentials given');
            }
        } catch (e) {
            throw new Error('Unable to login user | Wrong credentials given');
        }
    }
}
