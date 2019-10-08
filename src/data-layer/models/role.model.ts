import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript';

@Table({ tableName: "roles", timestamps: false })
export default class Role extends Model<Role> {

    @PrimaryKey
    @Column({ type: DataType.INTEGER, unique: true })
    id: number

    @Column({ allowNull: false })
    description: string
}