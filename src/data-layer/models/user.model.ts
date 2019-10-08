import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey } from 'sequelize-typescript';
import Role from './role.model';
 
@Table({ tableName: "users", timestamps: false })
export default class User extends Model<User> {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number

    @Column({ allowNull: false, unique: true })
    rfid: String

    @Column({ defaultValue: false })
    clockedIn: Boolean

    @Column({ defaultValue: false })
    hazmatSuite: Boolean

    @Column({ defaultValue: 1 })
    @ForeignKey(() => Role)
    roleId: number
}