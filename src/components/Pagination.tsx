import React, { FC, useState } from 'react'


type Props = {
    count: number
    totalUsers: number
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const Pagination: FC<Props> = ({ count, totalUsers, setCurrentPage }) => {

    // const [countButton,setCountButton] = useState(0);

    const arr = [];


    for (let index = 1; index < Math.ceil(totalUsers / count); index++) {
        arr.push(index);
    }
    console.log(count)
    return (
        <div className='pagination'>

            {
                arr.map((button, index) => <button onClick={() => setCurrentPage(button)} key={index}>{button}</button>)
            }

        </div>
    )
}

export default Pagination
