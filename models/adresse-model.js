import * as common from '../common/common-function.js'

export function getAddressModel(req){
    const axiosInstance = common.authHttpHeader()
    let url = "/places?q="+ req.query.q
    
    return axiosInstance.get(url)
    .then(response => {
        console.log('Address data: success ✔');
        return response.data
    })
    .catch(error => {
        console.error('Error:', error);
        throw error
    });
}