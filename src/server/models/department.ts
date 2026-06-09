import mongoose from 'mongoose'

export interface IDepartment {
  name: string;
  description?: string;
}

const DepartmentSchema = new mongoose.Schema<IDepartment>({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
})

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
export const DepartmentModel = mongoose.models.Department || mongoose.model('Department', DepartmentSchema)