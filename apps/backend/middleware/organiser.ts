import type { NextFunction, Request, Response } from "express";


export const verifyOrganiser=(req:Request,res:Response,next:NextFunction)=>{
    try {
        if(!req.user){
            res.status(401).json({message:"invalid request"});
            return;
        }
        if(req.user.role!=="organiser"){
            res.status(401).json({message:"unauthorised"});
            return;
        }
        next();
        
    } catch (error) {
        console.log("error in admin verify",error);
        
    }
}