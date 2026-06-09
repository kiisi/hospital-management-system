import { getAppointmentStats, getAvailableTimeSlots, getDepartments, getDoctors, getPatientAppointments, updateAppointmentStatus } from '@/server/appointments/index.function'
import { getSession } from '@/server/auth/index.server'
import { AppointmentModel } from '@/server/models/appointment'
import { PatientModel } from '@/server/models/patient'
import type { ISession } from '@/server/models/session'
import { useAppSession } from '@/server/session'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/appointments/')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url)
        const action = url.searchParams.get('action')

        const session = await useAppSession()

        let patientId;

        const sessionData: ISession | null = await getSession(session.id as string)

        if (sessionData) {
          patientId = sessionData.userId.toString();
        }

        const mainPatientId = await PatientModel.findOne({ userId: patientId });
        console.log(mainPatientId)


        try {
          switch (action) {
            case 'departments': {
              const departments = await getDepartments()
              console.log(departments)
              return Response.json({
                data: departments,
                message: "Department fetched successfully",
                success: true
              }, {
                status: 200
              })
            }

            case 'doctors': {
              const department = url.searchParams.get('department')
              const doctors = await getDoctors(department ? department : undefined)
              return Response.json({
                data: doctors,
                message: "Doctors fetched successfully",
                success: true
              }, {
                status: 200
              })
            }

            case 'timeSlots': {
              const doctorId = url.searchParams.get('doctorId')
              const date = url.searchParams.get('date')

              if (!doctorId || !date) {
                return Response.json({
                  success: false,
                  message: 'Doctor ID and date are required',
                  data: null,
                }, { status: 400 })
              }

              const timeSlots = await getAvailableTimeSlots(doctorId, date)
              return Response.json({
                message: "Time slots fetched",
                data: timeSlots
              },
                {
                  status: 200
                })
            }

            case 'patientAppointments': {
              const status = url.searchParams.get('status') || 'upcoming'
              const result = await getPatientAppointments(mainPatientId as string, status)
              return Response.json({
                data: result,
                message: "Appointments fetched successfully",
                success: true
              })
            }

            case 'stats': {
              const result = await getAppointmentStats(patientId as string)
              return Response.json({
                data: result,
                message: "Appointment stats loaded",
                successs: true,
              }, { status: 200 });
            }

            default:
              return Response.json({
                success: false,
                message: 'Invalid action parameter'
              }, { status: 400 })
          }
        } catch (error) {
          console.error('API Error:', error)
          return Response.json({
            success: false,
            message: 'Internal server error'
          }, { status: 500 })
        }
      },
      POST: async ({ request }) => {
        try {
          const body = await request.json()

          // Validate required fields
          const { doctorId, appointmentDate, appointmentTime, type, reason } = body

          if (!doctorId || !appointmentDate || !appointmentTime || !type) {
            return Response.json({
              success: false,
              message: 'Missing required fields',
              data: null
            },
              {
                status: 400
              })
          }

          const session = await useAppSession()

          let patientId;

          const sessionData: ISession | null = await getSession(session.id as string)

          if (sessionData) {
            patientId = sessionData.userId.toString();
          }

          const mainPatientId = await PatientModel.findOne({ userId: patientId });
          console.log(mainPatientId)

          const result = await AppointmentModel.create({
            patientId: mainPatientId._id,
            doctorId,
            appointmentDate,
            appointmentTime,
            type,
            reason: reason || ''
          })

          return Response.json({
            message: "Appointment created",
            data: result,
            success: true,
          },
            {
              status: 201
            })
        } catch (error) {
          console.error('API Error:', error)
          return Response.json({
            success: false,
            message: 'Failed to create appointment'
          }, { status: 500 })
        }
      },

      PUT: async ({ request }) => {
        try {
          const body = await request.json()
          const { id, status } = body

          if (!id || !status) {
            return Response.json({
              success: false,
              message: 'Appointment ID and status are required'
            }, { status: 400 })
          }

          // Validate status
          const validStatuses = ['confirmed', 'cancelled', 'completed', 'checked-in', 'in-progress']
          if (!validStatuses.includes(status)) {
            return Response.json({
              success: false,
              message: 'Invalid status'
            }, { status: 400 })
          }

          const result = await updateAppointmentStatus(id, status)
          return Response.json(result, { status: result.success ? 200 : 400 })
        } catch (error) {
          console.error('API Error:', error)
          return Response.json({
            success: false,
            message: 'Failed to update appointment'
          }, { status: 500 })
        }
      },
      DELETE: async ({ request }) => {
        try {
          const body = await request.json()
          const { id } = body

          if (!id) {
            return Response.json({
              success: false,
              message: 'Appointment ID is required'
            }, { status: 400 })
          }

          // Soft delete by setting status to cancelled
          await updateAppointmentStatus(id, 'cancelled');

          return Response.json({
            message: "Appointment deleted",
            success: true,
            data: null
          }, {
            status: 200
          })
        }
        catch (error) {
          console.error('API Error:', error)
          return Response.json({
            success: false,
            message: 'Failed to delete appointment'
          }, { status: 500 })
        }
      }
    }
  }
})
