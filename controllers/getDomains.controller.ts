import { Request, Response } from "express";
import Domains from "../models/domains.model";

export const getDomainsController =async (req: Request, res: Response)=>{
    const domain_name = req.params.domain_name;
    console.log("Domain name:", domain_name);
    if(!domain_name) {
        console.log("Domain name not found");
        res.status(500).json({error: "Internal Server Error"});
        return;
    }
    try {
        const domain = await Domains.findAll({where: {domain_name: domain_name}, attributes:["code", "value"]});
        if(domain.length===0) {
            console.log(`Nothing found in ${domain_name} table sending an empty array`);
            res.status(200).json({message:"Success", domain:[]});
            return ;
        }

        console.log(`Domains data sent successfully for ${domain_name}`);
        res.status(200).json({message:"Success", domain});
        return;

    } catch (error) {
        console.log(`Error in fetching domains table values for ${domain_name}:`, error);
        res.status(500).json({error: "Internal Server Error"});
        return;
    }
}
