const backend = 'https://api.strafregister.jyods.com/public/api/health';
// const backend = "http://jsstrafregisterbackend.test/api/health"

export async function getPatients() {
    const response = await fetch(`${backend}/patient`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    });
    return await response.json();
}

export async function getPatient(id) {
    const response = await fetch(`${backend}/patient/${id}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    });
    return await response.json();
}

export async function getHealthCase(id) {
    const response = await fetch(`${backend}/${id}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    });
    return await response.json();
}