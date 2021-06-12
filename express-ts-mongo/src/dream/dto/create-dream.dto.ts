import { IsString } from 'class-validator';

class DreamDto {
	@IsString({ always: true })
	public title!: string;

	@IsString({ always: true })
	public description!: string;

	@IsString({ always: true })
	public date!: string;

	@IsString({ always: true })
	public type!: string;
}
export default DreamDto;
