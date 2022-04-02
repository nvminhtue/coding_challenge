import { INestApplication } from '@nestjs/common';
import { expect } from 'chai';
// import { Response } from 'express';
// import jwt from 'jsonwebtoken';
// import { createRequest } from 'node-mocks-http';

// import { createUser } from 'src/database/factory/user.factory';
// import { UserEntity } from 'src/modules/users/user.entity';

import {
  closeApp,
  getResponse,
  // getSession,
  initApp,
} from 'test/helpers/test.helper';

describe('Query specific item of user entity', () => {
  let app: INestApplication;
  // let user: UserEntity;
  // let session: string;

  beforeAll(async (done) => {
    app = await initApp();
    // user = await createUser();
    // session = await getSession(app, user)
    done();
  })

  afterAll(async (done) => {
    await closeApp(app);

    done();
  })

  // describe.only('Success', () => {
  //   it('should return success with uploaded file', async () => {
  //     const accessToken = jwt.sign(
  //       { userId: user.id, username: user.username, email: user.email },
  //       process.env.ACCESS_TOKEN_SECRET, {
  //       expiresIn: '1d'
  //     });

  //     // tslint:disable-next-line:no-empty
  //     function MockFile() { };

  //     MockFile.prototype.create = (name, size, mimeType) => {
  //       name = name || 'mock.txt';
  //       size = size || 1024;
  //       mimeType = mimeType || 'plain/txt';

  //       function range(count) {
  //         let output = '';
  //         for (let i = 0; i < count; i++) {
  //           output += 'a';
  //         }
  //         return output;
  //       }

  //       const blob = new Blob([range(size)], { type: mimeType });

  //       return blob;
  //     };
  //     const _req = createRequest({
  //       headers: {
  //         'authorization': `Bearer ${accessToken}`,
  //       },
  //       files: new MockFile(),
  //     })

  //     const [_status, _res] = await getResponse(
  //       app,
  //       'post',
  //       `/uploadCsv`,
  //     )

  //     // expect(status).to.equal(200);
  //     // expect(data.id).to.equal(user.id);
  //     // expect(data.name).to.equal(user.name);
  //     // expect(data.username).to.equal(user.username);
  //     // expect(data.email).to.equal(user.email);
  //   })
  // })

  describe('Failure', () => {
    it('should return error when user is not login', async () => {
      const [status, res] = await getResponse(
        app,
        'post',
        `/search-list/uploadCsv`,
      )

      expect(status).to.equal(401);
      expect(res.errors.message).to.eql('Unauthorized');
    })
  })
})
