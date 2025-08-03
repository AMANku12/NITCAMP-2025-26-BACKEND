import Domains from "../models/domains.model"

export const getDomainsValues = async(domain_name: string, code: string)=>{
    try {
        const domain = await Domains.findOne({where: {domain_name: domain_name, code: code}});
        if(domain === null){
            return "";
        }
        const domainJson = domain.toJSON();
        return domainJson.value;

    } catch (error) {
        throw error;
    }
}