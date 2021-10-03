import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { DreamService } from './dream.service';
import { UpdateDreamDto } from './dto/update-dream.dto';
import { Dream, DreamDocument } from './schemas/dream.schema';

describe('Dream Service unit test', () => {
  let dreamService: DreamService;

  let mockDreamDoc = (mock? : Partial<DreamDocument>): any => ({
    _id: new Types.ObjectId(),
    title: mock?.title || 'Dream Title',
    date: mock?.date || new Date('2020-11-11'),  
    type: mock?.type || 'sad',
    description: mock?.description || 'Dream description'
  })


  let mockDreamModel = {
    findByIdAndRemove: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn()
  }

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
          DreamService,
          { provide: getModelToken(Dream.name), useValue: mockDreamModel },
        ],
      
    }).compile();

    dreamService = module.get<DreamService>(DreamService)
  });

    it('Should be defined', () => {
      expect(dreamService).toBeDefined();
    });


    it('should find dream', async () => {
        const dream = mockDreamDoc()
        const {_id, ...dreamDto} = dream
        mockDreamModel.findOne.mockReturnValue(dream)
        const res = await dreamService.getDream(_id)
        expect(res).toEqual(dream)
    })

    it('should create dream', async () => {
        const dream = mockDreamDoc()
        const {_id, ...dreamDto} = dream
        mockDreamModel.create.mockReturnValue(dream)
        const res = await dreamService.createDream(dreamDto)
        expect(res).toEqual(dream)
    })

    it('should update dream by id ', async () => {
        const dream = mockDreamDoc()
        const {_id, ...dreamDto} = dream
        mockDreamModel.findByIdAndUpdate.mockReturnValue(dream)
        const res = await dreamService.updateDream(dream._id, dreamDto)
        expect(res).toEqual(dream)

    })

    it('should remove dream by id', async () => {
        const dream = mockDreamDoc()
        mockDreamModel.findByIdAndRemove.mockReturnValue(dream)
        const res = await dreamService.removeDream(dream._id)
        expect(res).toEqual(dream)
    })
});
