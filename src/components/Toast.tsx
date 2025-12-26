import { useToast } from '../context/ToastContext'

export default function Toast() {
    const { toasts, removeToast } = useToast()

    if (toasts.length === 0) return null

    return (
        <div className="fixed bottom-4 right-4 z-[70] space-y-2">
            {toasts.map(toast => (
                <div
                    key={toast.id}
                    className={`toast-enter flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg min-w-[280px] ${toast.type === 'success'
                            ? 'bg-sage text-white'
                            : toast.type === 'error'
                                ? 'bg-red-500 text-white'
                                : 'bg-royal text-white'
                        }`}
                >
                    {toast.type === 'success' && (
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                    {toast.type === 'error' && (
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    )}
                    <span className="flex-1 font-medium">{toast.message}</span>
                    <button
                        onClick={() => removeToast(toast.id)}
                        className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            ))}
        </div>
    )
}
