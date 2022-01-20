import _ from 'lodash';
import cultivateMessages from './cultivateMessages';
import { MAX_SHOWING_MESSAGES } from './constants';

describe('cultivateMessages func test', () => {

    const user = 'testUserName';

    it('when stored messages list is empty', () => {
        //given
        const storedList = [];
        const incomingList = [
            { id: 'a1', createdAt: '2021-10-18T22:36:41.211Z', message: '', userName: 'John' },
            { id: 'a2', createdAt: '2021-10-18T22:31:41.211Z', message: '', userName: user }
        ];
        const expectedResult = [{ ...incomingList[1], self: true }, { ...incomingList[0], self: false }];

        //when
        //then
        expect(cultivateMessages(storedList, incomingList, user)).toEqual(expectedResult);
    });

    it('when stored messages list has messages except messages from incoming list', () => {
        //given
        const storedList = [
            { id: 'a2', createdAt: '2021-10-18T22:31:41.211Z', message: '', userName: user, self: true },
            { id: 'a1', createdAt: '2021-10-18T22:36:41.211Z', message: '', userName: 'John', self: false },
        ];
        const incomingList = [
            { id: 'a3', createdAt: '2021-10-18T22:54:41.211Z', message: '', userName: 'John' },
            { id: 'a4', createdAt: '2021-10-18T22:34:41.211Z', message: '', userName: user }
        ];
        const expectedResult = [
            storedList[0],
            { ...incomingList[1], self: true },
            storedList[1],
            { ...incomingList[0], self: false }
        ];

        //when
        //then
        expect(cultivateMessages(storedList, incomingList, user)).toEqual(expectedResult);
    });

    it('when stored messages list has messages include messages from incoming list', () => {
        //given
        const storedList = [
            { id: 'a2', createdAt: '2021-10-18T22:31:41.211Z', message: '', userName: user, self: true },
            { id: 'a1', createdAt: '2021-10-18T22:36:41.211Z', message: '', userName: 'John', self: false },
        ];
        const incomingList = [
            { id: 'a3', createdAt: '2021-10-18T22:54:41.211Z', message: '', userName: 'John' },
            { id: 'a1', createdAt: '2021-10-18T22:36:41.211Z', message: '', userName: 'John' },
            { id: 'a5', createdAt: '2021-10-18T22:01:41.211Z', message: '', userName: user },
        ];

        const expectedResult = [
            { ...incomingList[2], self: true },
            ...storedList,
            { ...incomingList[0], self: false },
        ];

        //when
        //then
        expect(cultivateMessages(storedList, incomingList, user)).toEqual(expectedResult);
    });

    it('when stored messages list has maximum size', () => {
        //given
        const storedList = _.times(MAX_SHOWING_MESSAGES, (i) => {
            return {
                id: `a${i}`,
                createdAt: '2021-10-18T22:01:41.211Z',
                message: '',
                userName: `user${i}`,
                self: false,
            };
        })

        const incomingList = [
            { id: `a67tt7tty`, createdAt: '2021-10-18T22:56:41.211Z', message: '', userName: 'John' },
            { id: `agggghjhj`, createdAt: '2021-10-18T22:54:41.211Z', message: '', userName: 'Fedor' },
        ];

        const expectedResult = [
            ...storedList,
            {...incomingList[1], self: false},
            {...incomingList[0], self: false}
        ].splice(2);

        //when
        //then
        expect(cultivateMessages(storedList, incomingList, user)).toEqual(expectedResult);
    });

});