import { CRUDRepository } from "./crud.repository"
import Event from "../models/event.model"
import ClockInOutEvent from "../models/clockInOutEvent.model"

export class EventRepository extends CRUDRepository {

    constructor() {
        super({}, "Event")
    }

    async getByEventKey(eventKey: number) {
        var include = eventKey == 4010 ? [ClockInOutEvent] : null
        return await Event.findOne({
            where: {
                eventKey: eventKey
            },
            include: include
        })
    }
}