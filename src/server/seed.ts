import { dbConnect } from "./db"
import { DepartmentModel } from "./models/department"
import { DoctorModel } from "./models/doctor"
import { UserModel } from "./models/user"
import { Types } from "mongoose";

export async function seedDatabase() {
  await dbConnect()

  // Seed Departments
  const departmentsCount = await DepartmentModel.countDocuments()
  if (departmentsCount === 0) {
    await DepartmentModel.insertMany([
      { name: 'Cardiologist', description: 'Heart and cardiovascular care specialists' },
      { name: 'Dermatologist', description: 'Skin, hair, and nail care specialists' },
      { name: 'Orthopedist', description: 'Bone, joint, and musculoskeletal specialists' },
      { name: 'General Physician', description: 'Primary care and general medical practice' },
      { name: 'Neurologist', description: 'Brain and nervous system specialists' },
      { name: 'Pediatrician', description: 'Healthcare for infants, children, and adolescents' }
    ])
    console.log('Departments seeded')
  }

  // Seed Doctors
  const doctorsCount = await DoctorModel.countDocuments()
  console.log(doctorsCount)
  if (doctorsCount === 0) {
    // const departments = await DepartmentModel.find()
    // const deptMap = departments.reduce((acc, dept) => {
    //   acc[dept.name] = dept._id
    //   return acc
    // }, {} as Record<string, any>)

    console.log("Will run")

    await DoctorModel.insertMany([
      {
        userId: new Types.ObjectId(),
        firstName: 'Michael',
        lastName: 'Chen',
        email: 'michael.chen@medicare.com',
        specialization: 'Cardiologist',
        phoneNumber: '+1-555-0101',
        hospitalName: 'Medicare General Hospital',
        yearsOfExperience: '10',
        medicalLicenseNumber: 'LIC-CARD-1001',
        availability: [
          { day: 'Monday', startTime: '09:00', endTime: '15:00' },
          { day: 'Wednesday', startTime: '10:00', endTime: '16:00' }
        ],
        isAvailable: true
      },
      {
        userId: new Types.ObjectId(),
        firstName: 'Emily',
        lastName: 'Williams',
        email: 'emily.williams@medicare.com',
        specialization: 'Dermatologist',
        phoneNumber: '+1-555-0102',
        hospitalName: 'Medicare Skin Center',
        yearsOfExperience: '8',
        medicalLicenseNumber: 'LIC-DERM-1002',
        availability: [
          { day: 'Tuesday', startTime: '08:00', endTime: '14:00' },
          { day: 'Thursday', startTime: '11:00', endTime: '17:00' }
        ],
        isAvailable: true
      },
      {
        userId: new Types.ObjectId(),
        firstName: 'Robert',
        lastName: 'Brown',
        email: 'robert.brown@medicare.com',
        specialization: 'General Physician',
        phoneNumber: '+1-555-0103',
        hospitalName: 'Medicare Health Clinic',
        yearsOfExperience: '12',
        medicalLicenseNumber: 'LIC-GEN-1003',
        availability: [
          { day: 'Monday', startTime: '08:00', endTime: '14:00' },
          { day: 'Friday', startTime: '09:00', endTime: '13:00' }
        ],
        isAvailable: true
      },
      {
        userId: new Types.ObjectId(),
        firstName: 'Lisa',
        lastName: 'Anderson',
        email: 'lisa.anderson@medicare.com',
        specialization: 'Orthopedist',
        phoneNumber: '+1-555-0104',
        hospitalName: 'Medicare Ortho Hospital',
        yearsOfExperience: '9',
        medicalLicenseNumber: 'LIC-ORTHO-1004',
        availability: [
          { day: 'Wednesday', startTime: '09:00', endTime: '15:00' },
          { day: 'Friday', startTime: '10:00', endTime: '16:00' }
        ],
        isAvailable: true
      },
      {
        userId: new Types.ObjectId(),
        firstName: 'Sarah',
        lastName: 'Mitchell',
        email: 'sarah.mitchell@medicare.com',
        specialization: 'Neurologist',
        phoneNumber: '+1-555-0105',
        hospitalName: 'Medicare Neuro Center',
        yearsOfExperience: '11',
        medicalLicenseNumber: 'LIC-NEURO-1005',
        availability: [
          { day: 'Tuesday', startTime: '10:00', endTime: '16:00' },
          { day: 'Thursday', startTime: '09:00', endTime: '15:00' }
        ],
        isAvailable: true
      },
      {
        userId: new Types.ObjectId(),
        firstName: 'James',
        lastName: 'Wilson',
        email: 'james.wilson@medicare.com',
        specialization: 'Pediatrician',
        phoneNumber: '+1-555-0106',
        hospitalName: 'Medicare Children Hospital',
        yearsOfExperience: '7',
        medicalLicenseNumber: 'LIC-PED-1006',
        availability: [
          { day: 'Monday', startTime: '09:00', endTime: '13:00' },
          { day: 'Thursday', startTime: '12:00', endTime: '17:00' }
        ],
        isAvailable: true
      }
    ])
    console.log('Doctors seeded')
  }

  // Seed Demo Patient
  const patientExists = await UserModel.findOne({ email: 'patient@demo.com' })
  if (!patientExists) {
    await UserModel.create({
      name: 'John Doe',
      email: 'patient@demo.com',
      password: 'password123',
      phone: '+1-555-0000',
      role: 'patient',
      bloodGroup: 'O+',
      dateOfBirth: new Date('1990-01-01')
    })
    console.log('Demo patient seeded')
  }
}