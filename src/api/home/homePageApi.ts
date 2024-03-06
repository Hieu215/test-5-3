export const updateDataVolumeDiscount = (data: any) => {
    localStorage.setItem('volumeDiscount', JSON.stringify(data))
}