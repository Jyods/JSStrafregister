const backend = 'http://jsstrafregisterbackend.test/api';

export async function getFiles() {
    const response = await fetch(`${backend}/files`,{
    headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
        });
    return await response.json();
}

export async function getCase(CaseID) {
    console.log(`${backend}/files/${CaseID}`)
    const response = await fetch(`${backend}/files/id/${CaseID}`);
    return await response.json();
}

export async function getEntries() {
    const response = await fetch(`${backend}/entries`,{
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
            });
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

export async function getMembers() {
    const response = await fetch(`${backend}/members`,{
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
            });
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

export async function createEntry(data) {
    const response = await fetch(`${backend}/entries/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}


export async function getCurrentUser() {
    console.log(sessionStorage.getItem('token'))
    const response = await fetch(`${backend}/user`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
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
    let data = await response.json();
    console.log(data);
    if(data.message == "Login failed")
    {
        return false;
    }
    sessionStorage.setItem('token', data.token);
    return data;
}

export async function auth() {
    // read document.cookie token
    const token = sessionStorage.getItem('token');

    console.log(token)
    if (!token) {
      return false;
    }
  
    // send token to backend as bearer token
    const response = await fetch(`${backend}/auth`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    // if response status is 500, remove token from document.cookie
    if (response.status === 500) {
        sessionStorage.removeItem('token');
        console.log("Token removed")
        return false;
    }

    const data = await response.json();
    console.log("Data:",data)
  
    // return true if response status is 200
    return response.status === 200;
  }
  
export async function getPermissions() {
    const response = await fetch(`${backend}/getPermissions`,
    {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
    });
    const data = await response.json();
    console.log(data)
    return data;
}

export async function createUser(data) {
    const response = await fetch(`${backend}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify(data)
    });
    let res = await response.json();
    console.log(res);
    if(res.message == "User created")
    {
        return true;
    }
    return false;
}

/*

export async function checkPermission(permission) {
    const response = await fetch(`${backend}/permission/${permission}`);
    return await response.json();
}*/