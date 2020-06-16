import React from 'react';

const Tbody=(props) => {

    return (
        <tbody>
            {
                props.users.map((user, index)=>(
                    <tr key={user.login.uuid}>
                        <th scope="row">{index+1}</th>
                        <td>{`${user.name.first} ${user.name.last}`}</td>
                        <td>{user.email}</td>
                        <td>{user.cell}</td>
                        <td>{user.location.city}</td>
                    </tr>

                ))
            }

        </tbody>
    )
}
export default Tbody