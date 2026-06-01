import { dbConnect } from '@/server/db.server';
import { PatientModel } from '@/server/models/patient';
import { useAppSession } from '@/server/session';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start';

const getPatientSession = createServerFn({ method: 'GET' })
    .handler(async () => {
        const session = await useAppSession()
        const userId = session.data.userId

        if (!userId) {
            throw redirect({ to: '/login' })
        }

        await dbConnect();

        let patient = await PatientModel
            .findOne({ userId })
            .populate('userId')

        if (!patient) {
            throw redirect({ to: '/login' })
        }

        patient = JSON.parse(JSON.stringify(patient))

        return { patient }
    })

export const Route = createFileRoute('/patient')({
    component: PatientLayout,
    beforeLoad: async () => {

        const { patient } = await getPatientSession()
        
        console.log(patient)

        return { patient }
    },
})

function PatientLayout() {

    const { patient } = Route.useRouteContext();

    return (
        <div>
            <h1>Welcome to the Patient, {patient.firstName} </h1>
            <Outlet />
        </div>
    )
}
