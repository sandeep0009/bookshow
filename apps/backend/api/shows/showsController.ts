
import { client } from "db/client";
import type { Request, Response } from "express";


export const createShow=async(req:Request,res:Response):Promise<any>=>{
    try {
        const {name,location,banner,eventDate,seats,seatLayout}=req.body;
        
        const showExist=await client.shows.findUnique({where:name});
        if(showExist){
            res.status(401).json({message:"show already exist"});
            return;
        }

        const organizerId=req.user?.id as string;
        

        const newShow=await client.shows.create({
            data:{
                name,location,banner,eventDate,seats,seatLayout,organizerId

            }
        });
        return res.status(201).json({message:"show created successfully"});
    } catch (error) {
        console.log("error in creating show",error);
        
    }
}

export const findAllShow=async(req:Request,res:Response):Promise<any>=>{
    try {
        const data=await client.shows.findMany();

        return res.status(200).json({message:"all shows fetched successfully ",data});
        
    } catch (error) {
        console.log("error in finding all shows",error);
        
    }
}


export const findByIdShow=async(req:Request,res:Response):Promise<any>=>{
    try {
        const {id}=req.params;
        if(!id){
            return;
        }
        const data=await client.shows.findUnique({where:{id}});
        return res.status(200).json({message:"fetched successfully",data});
        
    } catch (error) {
        console.log("error in finding show by id",error);
        
    }
}


export const updateShow=async(req:Request,res:Response):Promise<any>=>{
    try {
        const {id}=req.params;
        const { name, location, banner, eventDate, seats, seatLayout } = req.body;

        if(!id){
            return;
        }
        const showExist=await client.shows.findUnique({where:{id}});

        if(!showExist){
            return res.status(404).json({message:"show doesnt exist"});
        }

        const update=await client.shows.update({
            where:{id},
            data:{
                name,location,banner,eventDate,seats,seatLayout
            }
        });
        return res.status(200).json({message:"updated successfully",update});
        
        
    } catch (error) {
        console.log("error in updating show",error);
        
    }
}


export const deleteShow=async(req:Request,res:Response):Promise<any>=>{
    try {
        const {id}=req.params;

        await client.shows.delete({where:{id}});
        return res.status(200).json({message:"deleted successfully"});
        
    } catch (error) {

        console.log("errror in deleteing show",error)
        
    }
}