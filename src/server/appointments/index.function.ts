import { dbConnect } from "../db"
import { AppointmentModel } from "../models/appointment"
import { DepartmentModel } from "../models/department"
import { DoctorModel } from "../models/doctor"


export async function getDepartments() {
  try {
    await dbConnect()
    const departments = await DepartmentModel.find().sort({ name: 1 }).lean()
    return departments
  } catch (error) {
    console.error('Error fetching departments:', error)
    return { success: false, error: 'Failed to fetch departments' }
  }
}

export async function getDoctors(department?: string) {
  try {
    await dbConnect()

    console.log(department?.toLowerCase())
    
    const doctors = await DoctorModel.find({ specialization: department?.toLowerCase() }).lean()
    console.log(doctors)
    
    return doctors
  } catch (error) {
    console.error('Error fetching doctors:', error)
    return { success: false, error: 'Failed to fetch doctors' }
  }
}

export async function getAvailableTimeSlots(doctorId: string, date: string) {
  try {
    await dbConnect()
    
    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)
    
    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)
    
    // Get existing appointments for that doctor on that date
    const existingAppointments = await AppointmentModel.find({
      doctor: doctorId,
      appointmentDate: { $gte: startOfDay, $lte: endOfDay },
      status: { $ne: 'cancelled' }
    }).select('appointmentTime').lean()

    const bookedTimes = existingAppointments.map(a => a.appointmentTime)

    // Generate available time slots (9 AM to 5 PM, 30 min intervals)
    const allTimeSlots = []
    for (let hour = 9; hour < 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        const displayTime = `${hour > 12 ? hour - 12 : hour}:${minute.toString().padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`
        
        if (!bookedTimes.includes(time)) {
          allTimeSlots.push({
            value: time,
            display: displayTime
          })
        }
      }
    }

    return allTimeSlots
  } catch (error) {
    console.error('Error fetching time slots:', error)
    return { success: false, error: 'Failed to fetch time slots' }
  }
}

export async function createAppointment(data: {
  patientId: string
  doctorId: string
  appointmentDate: string
  appointmentTime: string
  type: string
  reason?: string
}) {
  try {
    await dbConnect()

    // Validate doctor exists
    const doctor = await DoctorModel.findById(data.doctorId)
    if (!doctor) {
      return { success: false, error: 'Doctor not found' }
    }

    // Create appointment
    const appointment = await AppointmentModel.create({
      patient: data.patientId,
      doctor: data.doctorId,
      appointmentDate: new Date(data.appointmentDate),
      appointmentTime: data.appointmentTime,
      type: data.type,
      reason: data.reason || '',
      status: 'pending'
    })

    // Populate doctor details
    await appointment.populate('doctor', 'name specialty')
    
    return { 
      success: true, 
      data: appointment,
      message: 'Appointment booked successfully' 
    }
  } catch (error: any) {
    console.error('Error creating appointment:', error)
    
    // Handle duplicate key error (double booking)
    if (error.code === 11000) {
      return { success: false, error: 'This time slot is no longer available' }
    }
    
    return { success: false, error: 'Failed to create appointment' }
  }
}

export async function getPatientAppointments(patientId: string, status?: string) {
  try {
    await dbConnect()
    console.log("patientID", patientId)
    const query: any = { patientId }
    const now = new Date()
    
    if (status === 'upcoming') {
      query.status = { $in: ['pending', 'confirmed'] }
      query.appointmentDate = { $gte: now }
    } else if (status === 'past') {
      query.$or = [
        { status: { $in: ['completed', 'cancelled'] } },
        { appointmentDate: { $lt: now } }
      ]
    }
    
    const appointments = await AppointmentModel.find(query)
      .populate('doctorId')
      .populate('patientId')
      .sort({ appointmentDate: -1, appointmentTime: -1 })
      .lean()

      console.log("Appointments", appointments)
    
    return appointments
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return { success: false, error: 'Failed to fetch appointments' }
  }
}

export async function updateAppointmentStatus(appointmentId: string, status: string) {
  try {
    await dbConnect()
    
    const appointment = await AppointmentModel.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    )

    if (!appointment) {
      return { success: false, error: 'Appointment not found' }
    }

    return { success: true, message: `Appointment ${status} successfully` }
  } catch (error) {
    console.error('Error updating appointment:', error)
    return { success: false, error: 'Failed to update appointment' }
  }
}

export async function getAppointmentStats(patientId: string) {
  try {
    await dbConnect()
    const now = new Date()
    
    const [total, upcoming, completed, cancelled] = await Promise.all([
      AppointmentModel.countDocuments({ patient: patientId }),
      AppointmentModel.countDocuments({
        patient: patientId,
        status: { $in: ['pending', 'confirmed'] },
        appointmentDate: { $gte: now }
      }),
      AppointmentModel.countDocuments({
        patient: patientId,
        status: 'completed'
      }),
      AppointmentModel.countDocuments({
        patient: patientId,
        status: 'cancelled'
      })
    ])

    return { total, upcoming, completed, cancelled };
  } catch (error) {
    console.error('Error fetching stats:', error)
    return { success: false, error: 'Failed to fetch stats' }
  }
}