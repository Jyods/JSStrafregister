const backend = 'http://jsstrafregisterbackend.test/api';

export async function getFiles() {
    const response = await fetch(`${backend}/files`);
    return await response.json();
}

export async function getCase(CaseID) {
    console.log(`${backend}/files/${CaseID}`)
    const response = await fetch(`${backend}/files/${CaseID}`);
    return await response.json();
}

export async function getEntries() {
    const response = await fetch(`${backend}/entries`);
    return await response.json();
}

export async function getEntry(EntryID) {
    const response = await fetch(`${backend}/entries/${EntryID}`);
    return await response.json();
}

export async function getMember(MemberID) {
    const response = await fetch(`${backend}/members/${MemberID}`);
    return await response.json();
}

export async function createFile(data) {
    const response = await fetch(`${backend}/files/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}

/*
export async function getCurrentUser() {
    const response = await fetch(`${backend}/user`);
    return await response.json();
}

export async function authenticateUser(email, password) {
    const response = await fetch(`${backend}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    });
    return await response.json();
}

export async function auth() {
    const response = await fetch(`${backend}/auth`);
    return await response.json();
}

export async function checkPermission(permission) {
    const response = await fetch(`${backend}/permission/${permission}`);
    return await response.json();
}*/