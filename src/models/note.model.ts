//src>models>note.models.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Note extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public isArchived!: boolean;
  public isInTrash!: boolean;
  public CreatedBy!: number;
}

Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    isArchived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isInTrash: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    CreatedBy: { 
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Note',
  }
);

export default Note;