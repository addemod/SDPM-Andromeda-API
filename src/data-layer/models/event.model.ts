import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, AfterCreate } from 'sequelize-typescript';
import { EventKey } from './eventKey.enum';
import User from './user.model';
import * as request from 'request-promise'
 
@Table({ tableName: "events", timestamps: false })
export default class Event extends Model<Event> {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number

    @Column(DataType.INTEGER)
    @ForeignKey(() => User)
    userId: number

    @Column({ allowNull: false })
    @Column(DataType.INTEGER)
    eventKey: EventKey

    @Column({ allowNull: false, defaultValue: new Date() })
    dateCreated: Date

    @Column({ allowNull: true })
    data: string

    @AfterCreate
    static async updateUser(instance: Event) {
        console.log(instance);
        
        let eventKey = instance.eventKey
        // Make sure the event has a user
        if(instance.data) {
            // Make sure the event is either clock in or out
            if(eventKey == EventKey.CLOCKED_IN_OUT) {
                // Get user based on rfid
                var user = await User.findOne({
                    where: {
                        rfid: instance.data // data = rfid
                    }
                })
                
                if(!user) {
                    // Create the user
                    var url = process.env.NODE_ENV == "production" ? "http://andromeda-rest-api.herokuapp.com" : "http://localhost:8080"
                    user = await request.post({
                        url: url + "/users",
                        body: {
                            rfid: instance.data
                        },
                        json: true
                    })
                    
                    if(!user)
                        return
                }
                instance.userId = user.id
                await instance.save()
                
                
                // Invert the user's clockedIn value
                return await User.update({
                    clockedIn: !user.clockedIn
                }, {
                    where: {
                        id: user.id
                    }
                })
            }
        }
    }
}