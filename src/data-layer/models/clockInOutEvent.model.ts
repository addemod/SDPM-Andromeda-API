import Event from './event.model';
import { Table, Model, PrimaryKey, AutoIncrement, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
 
@Table({ tableName: "clockInOutEvents", timestamps: false })
export default class ClockInOutEvent extends Model<ClockInOutEvent> {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number
  
    @Column(DataType.INTEGER)
    @ForeignKey(() => Event)
    eventId: number

    @Column({ allowNull: false })
    @Column(DataType.INTEGER)
    clockedIn: Boolean
}