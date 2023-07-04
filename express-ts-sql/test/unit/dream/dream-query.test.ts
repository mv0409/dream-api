import { Between, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { getDreamsQuery } from "../../../src/entities/dream/query/dream.query";
import { DREAM_TYPE, IMockDreamRequest } from "../../../src/entities/dream/types"
import {Request} from 'express';
describe('🧪 Dream query test', () => {

    const startDate = '2017-12-12'
    const endDate = '2023-12-12'

    const mockRequest = {
        query: {},
      } as Request;

    const mockReq = ({ startDate, endDate, title, type }: IMockDreamRequest) => {
        return {
          ...(startDate && { startDate }),
          ...(endDate && { endDate }),
          ...(title && { title }),
          ...(type && { type }),
        };
      };

    it('Should add title to query object', async() => {
        // const some = mockReq({title: 'sad'})
        mockRequest.query = mockReq({title: 'test'})
        const result = getDreamsQuery(mockRequest)
        expect(result.title).toEqual('test')
    })

    it('Should add type to query object', async() => {
        // const some = mockReq({title: 'sad'})
        mockRequest.query = mockReq({type: DREAM_TYPE.EXCITING})
        const result = getDreamsQuery(mockRequest)
        expect(result.type).toEqual(DREAM_TYPE.EXCITING)
    })

    it('Should add startDate to query object', async() => {
        mockRequest.query = mockReq({startDate})
        const result = getDreamsQuery(mockRequest)
        expect(result.date).toEqual(MoreThanOrEqual(new Date(startDate)))
    })

    it('Should add endDate to query object', async() => {
        const date = '2017-12-12'
        mockRequest.query = mockReq({endDate})
        const result = getDreamsQuery(mockRequest)
        expect(result.date).toEqual(LessThanOrEqual(new Date(endDate)))
    })

    it('Should add startDate and endDate to query object', async() => {
        mockRequest.query = mockReq({startDate, endDate})
        const result = getDreamsQuery(mockRequest)
        expect(result.date).toEqual(Between(new Date(startDate), new Date(endDate)))
    })
})