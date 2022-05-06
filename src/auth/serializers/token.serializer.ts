import { ModelSerializer } from '../../models/model.serializer';
import { TokenInterface } from '../interfaces/token.interface';

export class TokenSerializer extends ModelSerializer implements TokenInterface {
  access_token: string;
}
