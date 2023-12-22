const backend = 'https://api.strafregister.jyods.com/public/api/logistic';
// const backend = "http://jsstrafregisterbackend.test/api/logistic";

export async function getLogistics() {
    const response = await fetch(`${backend}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    });
        return await response.json();
}
