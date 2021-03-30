export interface PagionationInterface {
	next?: {
		page?: number;
		limit?: number;
	};
	prev?: {
		page?: number;
		limit?: number;
	};
}
