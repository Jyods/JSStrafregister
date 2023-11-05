const backend = 'https://home-5013253951.app-ionos.space/public/api/health';
// const backend = "http://jsstrafregisterbackend.test/api/health"

export async function getPatients() {
    const response = await fetch(`${backend}/patient`,{method: 'GET'});
        return await response.json();
}

export async function getPatient(id) {
    const response = await fetch(`${backend}/patient/${id}`,{method: 'GET'});
        return await response.json();
}