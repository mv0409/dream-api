export interface PagionationInterface {
	next?: {
		page?: number;
		limit?: number;
	};
	previous?: {
		page?: number;
		limit?: number;
	};
}
