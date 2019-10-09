import { UserRepository, CRUDRepository } from "../../data-layer/repositories"
import Event from "../../data-layer/models/event.model"
import { EventRepository } from "../../data-layer/repositories/event.repository"
import ClockInOutEvent from "../../data-layer/models/clockInOutEvent.model"

export class EventManager {

    private eventRepository: EventRepository

    constructor({ eventRepository }) {
        this.eventRepository = eventRepository
    }

    async getEvents(query: any = null) {
        var include = null
        if(query.eventKey && query.eventKey == 4010)
            include = [ClockInOutEvent]
        return await this.eventRepository.getAll(query, include)
    }

    async getByEventKey(eventKey: number) {
        return await this.eventRepository.getByEventKey(eventKey)
    }

    async getEvent(id: any) {
        return await this.eventRepository.getByPk(id)
    }

    async createEvent(eventData: Event) {
        return await this.eventRepository.create(eventData)
    }
}