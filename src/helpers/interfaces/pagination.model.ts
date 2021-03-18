export interface PagionationModel {
    next? : {
        page?: number,
        limit?: number
    },
    prev? : {
        page?: number,
        limit?: number
    }
}