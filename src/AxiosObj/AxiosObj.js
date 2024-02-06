import Axios from "axios"

const AxiosObj = Axios.create({ baseURL: 'https://ashrishait.org/sbkb/sbkb/api/' })

export default AxiosObj;