import { useSelector } from "react-redux"
import Text from './Text';

const Period =({index})=>{

    const page = useSelector((state)=> state.table.currentpage)
    const table = useSelector((state)=> state.table.tables)


    return(
        <>
        <Text>{table[page][index+1]? table[page][index+1][0]: "24:00"}</Text>
        </>
    )
}

export default Period