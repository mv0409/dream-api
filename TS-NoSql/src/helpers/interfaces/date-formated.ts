export class DateFormated{
    date!: {}
    constructor(gt: Date, lt: Date ) {
        if(gt > lt) {
            this.date = {
                $gt : new Date(lt),
                $lt : new Date(gt)
            }

        } else {
            this.date = {
                $gt : new Date(gt),
                $lt : new Date(lt)

            }
        }
    }
}