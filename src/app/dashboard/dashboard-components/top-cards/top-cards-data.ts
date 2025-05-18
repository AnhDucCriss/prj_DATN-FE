export interface topcard {
    bgcolor: string,
    icon: string,
    title: string,
    subtitle: string
}

export const topcards: topcard[] = [

    {
        bgcolor: 'success',
        icon: 'bi bi-wallet',
        title: '40',
        subtitle: 'Tổng số nhân viên'
    },
    {
        bgcolor: 'danger',
        icon: 'bi bi-coin',
        title: '20',
        subtitle: 'Tổng số bác sĩ'
    },
    {
        bgcolor: 'warning',
        icon: 'bi bi-basket3',
        title: '85',
        subtitle: 'Tổng số bệnh nhân'
    },
    {
        bgcolor: 'info',
        icon: 'bi bi-bag',
        title: '100',
        subtitle: 'Tổng số hồ sơ khám bệnh'
    },

] 