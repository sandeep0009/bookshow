import bcrypt from "bcryptjs";
import { client } from "db/client";
import type { Request,Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config";


export const singin=async(req:Request,res:Response):Promise<any>=>{
    try {
        const {name,password,email,role}=req.body;

        const userExist=await client.user.findUnique({where:email});

        if(userExist){
            res.status(400).json({message:"user already exist"});
            return;
        }
        const hashPassword=await bcrypt.hash(password,10);
        const createUser=await client.user.create({
            data:{
                name,
                email,
                password:hashPassword,
                role
            }
        });

        res.status(201).json({message:"user created",createUser});
        
    } catch (error) {
        console.log(error)
        
    }
}


export const singup=async(req:Request,res:Response):Promise<any>=>{
    try {
        const {email,password}=req.body;

        const userExist=await client.user.findUnique({where:email});
        if(!userExist){
            res.status(404).json({message:'invalid credentials'});
            return;
        }
        const matchPassword=await bcrypt.compare(password,userExist.password);
        if(!matchPassword){
            res.status(404).json({message:'invalid credentials'});
            return;

        }

        const token=jwt.sign({user:userExist},JWT_SECRET,{expiresIn:"1d"});

        return res.status(200).json({message:"logged in",token});
        
    } catch (error) {
        console.log(error)
        
    }
}