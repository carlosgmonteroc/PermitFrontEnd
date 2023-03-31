import Axios from 'axios';
import moment from 'moment'

export async function getPermitTypes() {
    const response = await Axios.get(`${import.meta.env.VITE_API_URL}/api/permit_types`, {
        headers: { 'Content-Type': 'application/json' }
    });
    return response.status == 200 ? response.data : []
}

export async function getPermits() {
    const response = await Axios.get(`${import.meta.env.VITE_API_URL}/api/permits`, {
        headers: { 'Content-Type': 'application/json' }
    });
    return response.status == 200 ? response.data.map(v => {
        return {
            ...v,
            permitDate: moment(v.permitDate).format('yyyy-MM-DD')
        }
    }) : []
}

export async function createPermit(permit) {
    const response = await Axios.post(`${import.meta.env.VITE_API_URL}/api/permits`, permit, {
        headers: { 'Content-Type': 'application/json' }
    });
    return response.status == 200 ? response.data : null
}

export async function updatePermit(id, permit) {
    const response = await Axios.put(`${import.meta.env.VITE_API_URL}/api/permits/${id}`, permit, {
        headers: { 'Content-Type': 'application/json' }
    });
    return response.status == 200 ? response.data : null
}

export async function deletePermit(id) {
    const response = await Axios.delete(`${import.meta.env.VITE_API_URL}/api/permits/${id}`, {
        headers: { 'Content-Type': 'application/json' }
    });
    return response.status == 200 ? response.data : null
}