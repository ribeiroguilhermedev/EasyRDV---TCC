import toast from 'react-hot-toast';


export function ErrorToast(msg: string) {
    return toast.error(msg, {
        position: 'top-right'
    });
}
export function SuccessToast(msg?: string) {
    return toast.success(msg ? msg : "Operação executada com sucesso!", {
        position: 'top-right'
    });
}