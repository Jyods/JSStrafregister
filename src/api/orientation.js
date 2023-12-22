// const backend = 'https://home-5013253951.app-ionos.space/public/api/logistic';
const backend = "http://jsstrafregisterbackend.test/api/orientations";

export async function getPermittetOrientations() {
    const response = await fetch(`${backend}/permitted`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    });
        return await response.json();
}

export async function getOrientationById(id) {
    const response = await fetch(`${backend}/${id}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    });
        return await response.json();
}

export async function createOrientation(orientation) {
    const response = await fetch(`${backend}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(orientation)
    });
        return await response.json();
}

export async function createPermission(permission) {
    const response = await fetch(`${backend}/permission`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(permission)
    });
        return await response.json();
}

export async function updateOrientation(orientation, id) {
    const response = await fetch(`${backend}/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(orientation)
    });
        return await response.json();
}

export async function deleteOrientation(id) {
    const response = await fetch(`${backend}/${id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    });
        return await response.json();
}

export async function get_perms_for_orientation(id) {
    const response = await fetch(`${backend}/permission/orientation_file/${id}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    });
        return await response.json();
}

export async function deletePermission(id) {
    const response = await fetch(`${backend}/permission/${id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    });
        return await response.json();
}