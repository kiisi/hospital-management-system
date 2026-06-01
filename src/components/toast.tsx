import { CheckCircle2, CircleAlert } from "lucide-react"

export const ErrorFeedback = ({ message }: { message: string }) => {
    return (
        <div className="flex items-start gap-3 w-full rounded-xl border border-red-200 bg-red-50 p-4  transition-all duration-300">
            <div className="mt-0.5 flex-shrink-0 rounded-full bg-red-100 p-1">
                <CircleAlert className="h-5 w-5 text-red-600" />
            </div>
            <div className="flex-1">
                <h2 className="text-[15px] font-semibold text-red-800">Error</h2>
                <p className="mt-1 text-[13.5px] font-medium text-red-600/90 leading-relaxed tracking-wide">{message}</p>
            </div>
        </div>
    )
}

export const SuccessFeedback = ({ message }: { message: string }) => {
    return (
        <div className="flex items-start gap-3 w-full rounded-xl border border-green-200 bg-green-50 p-4  transition-all duration-300">
            <div className="mt-0.5 flex-shrink-0 rounded-full bg-green-100 p-1">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-1">
                <h2 className="text-[15px] font-semibold text-green-800">Success</h2>
                <p className="mt-1 text-[13.5px] font-medium text-green-600/90 leading-relaxed tracking-wide">{message}</p>
            </div>
        </div>
    )
}