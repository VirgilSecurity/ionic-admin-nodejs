import { AuthOptions, Authentication } from './authentication';
import BasicAuthentication from './basic-authentication';
import BearerAuthentication from './bearer-authentication';
import MacAuthentication from './mac-authentication';

function assertNever(x: never): never {
  throw new Error('Unexpected object: ' + x);
}

export default function createAuthentication(options: AuthOptions): Authentication {
  switch (options.type) {
    case 'basic':
      return new BasicAuthentication(options.username, options.password);
    case 'bearer':
      return new BearerAuthentication(options.secretToken);
    case 'mac':
      return new MacAuthentication(options.apiKeyId, options.apiKeySecret);
    default:
      return assertNever(options);
  }
}
