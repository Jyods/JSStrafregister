// const backend = 'https://home-5013253951.app-ionos.space/public/api/logistic';
const backend = "http://jsstrafregisterbackend.test/api/orientations";

export async function getOrientations() {
    const response = await fetch(`${backend}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    });
        return await response.json();
}
